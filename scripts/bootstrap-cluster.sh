#!/usr/bin/env bash
# ==============================================================================
# KUBERNETES CONTROL-PLANE BOOTSTRAP SCRIPT (kubeadm + containerd + Cilium)
# Targets: Ubuntu 22.04 LTS on AWS EC2
# ==============================================================================

set -euo pipefail

K8S_VERSION="1.30.0-1.1"
CILIUM_CLI_VERSION="v0.16.8"
POD_CIDR="10.244.0.0/16"

echo "=== [1/6] Disabling Swap and Configuring Kernel Modules ==="
sudo swapoff -a
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab

cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter

cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF

sudo sysctl --system

echo "=== [2/6] Installing containerd Container Runtime ==="
sudo apt-get update -y
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release

sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg --yes
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update -y
sudo apt-get install -y containerd.io

sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml > /dev/null
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml
sudo systemctl restart containerd
sudo systemctl enable containerd

echo "=== [3/6] Installing kubeadm, kubelet, and kubectl ==="
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.30/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg --yes
sudo chmod 644 /etc/apt/keyrings/kubernetes-apt-keyring.gpg

echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.30/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

sudo apt-get update -y
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl

echo "=== [4/6] Initializing Kubernetes Control Plane with kubeadm ==="
CONTROL_PLANE_IP=$(hostname -I | awk '{print $1}')

sudo kubeadm init \
  --apiserver-advertise-address="${CONTROL_PLANE_IP}" \
  --pod-network-cidr="${POD_CIDR}" \
  --node-name=portfolio-k8s-control

echo "=== [5/6] Configuring kubectl Environment for ubuntu User ==="
mkdir -p "$HOME/.kube"
sudo cp -i /etc/kubernetes/admin.conf "$HOME/.kube/config"
sudo chown "$(id -u):$(id -g)" "$HOME/.kube/config"

echo "=== [6/6] Installing Cilium CNI in eBPF Mode ==="
CILIUM_CLI_VERSION=$(curl -s https://raw.githubusercontent.com/cilium/cilium-cli/main/stable.txt)
CLI_ARCH=amd64
if [ "$(uname -m)" = "aarch64" ]; then CLI_ARCH=arm64; fi

curl -L --fail --remote-name-all "https://github.com/cilium/cilium-cli/releases/download/${CILIUM_CLI_VERSION}/cilium-linux-${CLI_ARCH}.tar.gz"
sudo tar xzvfC "cilium-linux-${CLI_ARCH}.tar.gz" /usr/local/bin
rm "cilium-linux-${CLI_ARCH}.tar.gz"

cilium install --version 1.15.5 \
  --set ipam.operator.clusterPoolIPv4PodCIDRList="${POD_CIDR}" \
  --set routingMode=tunnel \
  --set tunnelProtocol=vxlan

echo "=== Control Plane Bootstrap Complete! Generate Join Token: ==="
kubeadm token create --print-join-command > /tmp/worker-join-command.sh
chmod +x /tmp/worker-join-command.sh
cat /tmp/worker-join-command.sh

