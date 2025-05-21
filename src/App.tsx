import { useState } from 'react'
import { ethers } from 'ethers'

const CONTRACT = '0xb9c8b67b6a2309c4fd26408641a15be6d77bab21'

export default function App() {
  const [wallet, setWallet] = useState('')
  const [connected, setConnected] = useState(false)

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await provider.send('eth_requestAccounts', [])
      setWallet(accounts[0])
      setConnected(true)
    } else {
      alert('Vui lòng cài MetaMask')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-md p-6 text-center w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">IDO của LocalPay</h1>
        <p className="mb-1">Mã thông báo: LPAY</p>
        <p className="mb-1">Giá: 1 LPAY = 0,05 USDT</p>
        <p className="mb-2">Hợp đồng: {CONTRACT}</p>
        {!connected ? (
          <button
            onClick={connectWallet}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Kết nối ví
          </button>
        ) : (
          <p className="text-green-600">Đã kết nối: {wallet}</p>
        )}
      </div>
    </div>
  )
}