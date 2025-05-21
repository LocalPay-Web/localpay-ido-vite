// src/App.tsx
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const tokenAddress = '0xb9c8b67b6a2309c4fd26408641a15be6d77bab21';
const usdtAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // ví dụ USDT
const abi = [
  'function balanceOf(address) view returns (uint)',
  'function transfer(address to, uint amount) returns (bool)',
];

export default function App() {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setConnected(true);

        const tokenContract = new ethers.Contract(tokenAddress, abi, provider);
        const bal = await tokenContract.balanceOf(address);
        setBalance(ethers.formatUnits(bal, 18));
      } catch (err) {
        console.error('Connection error:', err);
      }
    } else {
      alert('Vui lòng cài MetaMask');
    }
  };

  const buyTokens = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const usdt = new ethers.Contract(usdtAddress, abi, signer);
      const tx = await usdt.transfer(tokenAddress, ethers.parseUnits('5', 6)); // 5 USDT
      await tx.wait();
      alert('Mua thành công 100 LPAY!');
    } catch (err) {
      alert('Lỗi giao dịch: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-6 font-sans">
      <div className="max-w-xl mx-auto bg-white/90 backdrop-blur-lg border border-gray-200 p-8 rounded-3xl shadow-2xl text-center">
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-4">IDO của LocalPay</h1>
        <p className="text-gray-700 mb-1 text-lg">Mã thông báo: <strong>LPAY</strong></p>
        <p className="text-gray-700 mb-1 text-lg">Giá: <strong>1 LPAY = 0.05 USDT</strong></p>
        <p className="text-sm text-gray-500 mb-4 break-all">
          Hợp đồng: {tokenAddress}
        </p>

        {connected ? (
          <>
            <p className="text-green-600 font-semibold">Đã kết nối: {account}</p>
            <p className="text-gray-600 mb-4">Số dư LPAY: {balance}</p>
            <button
              onClick={buyTokens}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-full shadow-md transition transform hover:scale-105"
            >
              Mua LPAY
            </button>
          </>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-full shadow-md transition transform hover:scale-105"
          >
            Kết nối ví
          </button>
        )}
      </div>

      <div className="max-w-3xl mx-auto mt-10 bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">🛣 Roadmap</h2>
        <ul className="list-disc pl-6 text-gray-800 space-y-2">
          <li>Q2 2025: Phát hành token LPAY & IDO</li>
          <li>Q3 2025: Ra mắt ví và tích hợp LocalPay tại các điểm thanh toán</li>
          <li>Q4 2025: Niêm yết LPAY lên sàn CEX</li>
        </ul>
      </div>

      <div className="max-w-3xl mx-auto mt-6 bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">👨‍💻 Đội ngũ dự án</h2>
        <ul className="text-gray-800 space-y-1">
          <li><strong>Hoang Tu</strong> – Founder & Idea Leader</li>
          <li><strong>Tuan Nguyen</strong> – Fullstack Coder</li>
          <li>Tư vấn bởi các cựu sinh viên ĐH Bách Khoa</li>
        </ul>
      </div>

      <div className="max-w-3xl mx-auto mt-6 bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">❓ Câu hỏi thường gặp (FAQ)</h2>
        <div className="text-left text-gray-800 space-y-4">
          <div>
            <p className="font-semibold">LPAY là gì?</p>
            <p>Là token tiện ích trong hệ sinh thái thanh toán LocalPay.</p>
          </div>
          <div>
            <p className="font-semibold">Làm sao để mua LPAY?</p>
            <p>Chỉ cần kết nối ví và bấm “Mua LPAY”.</p>
          </div>
          <div>
            <p className="font-semibold">Token có vesting không?</p>
            <p>Không – tất cả LPAY được unlock ngay khi mua.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
