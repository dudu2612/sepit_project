"use client"
import { useEffect, useState } from "react"
import supabase from "../../utils/supabaseClient"

export default function AdminDashboard() {
  const [produk, setProduk] = useState([])
  const [transaksi, setTransaksi] = useState([])
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user?.email !== "duhalkhairi22@gmail.com") {
        window.location.href = "/"
        return
      }
      setUserEmail(user.email)

      const { data: produkData } = await supabase.from("produk").select("*")
      setProduk(produkData || [])

      const { data: transaksiData } = await supabase.from("transaksi").select("*")
      setTransaksi(transaksiData || [])
    }
    fetchData()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-4 text-sm text-gray-500">Logged in as: {userEmail}</p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Produk</h2>
        <table className="w-full border text-sm">
          <thead>
            <tr>
              <th className="border px-2">Nama</th>
              <th className="border px-2">Harga</th>
              <th className="border px-2">Stok</th>
              <th className="border px-2">User</th>
            </tr>
          </thead>
          <tbody>
            {produk.map((item) => (
              <tr key={item.id}>
                <td className="border px-2">{item.nama_produk}</td>
                <td className="border px-2">{item.harga}</td>
                <td className="border px-2">{item.stok}</td>
                <td className="border px-2">{item.user_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Transaksi</h2>
        <table className="w-full border text-sm">
          <thead>
            <tr>
              <th className="border px-2">ID</th>
              <th className="border px-2">User</th>
              <th className="border px-2">Total</th>
              <th className="border px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.map((item) => (
              <tr key={item.id}>
                <td className="border px-2">{item.id}</td>
                <td className="border px-2">{item.user_id}</td>
                <td className="border px-2">{item.total}</td>
                <td className="border px-2">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
