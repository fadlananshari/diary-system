import { useState, useEffect } from "react";

export default function ZipCodeManager() {
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [zipList, setZipList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("zipList")) || [];
    setZipList(storedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("zipList", JSON.stringify(zipList));
  }, [zipList]);

  const searchZipCode = async () => {
    if (!zipCode) return alert("Masukkan kode pos terlebih dahulu!");

    try {
      const response = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`
      );
      const data = await response.json();

      if (data.status === 200 && Array.isArray(data.results) && data.results.length > 0) {
        const fullAddress = data.results
          .map(result => `${result.address1} ${result.address2} ${result.address3},`)
          .join("\n");
        setAddress(fullAddress);
      } else {
        alert("Kode pos tidak ditemukan!");
        setAddress("");
      }
      
    } catch (error) {
      console.error("Error fetching ZIP code:", error);
    }
  };

  const saveZipCode = () => {
    if (!zipCode || !address) return alert("Kode pos dan alamat harus diisi!");

    if (isEditing) {
      const updatedList = [...zipList];
      updatedList[editIndex] = { zipcode: zipCode, address };
      setZipList(updatedList);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setZipList([...zipList, { zipcode: zipCode, address }]);
    }

    setZipCode("");
    setAddress("");
  };

  const deleteZipCode = (index) => {
    const updatedList = zipList.filter((_, i) => i !== index);
    setZipList(updatedList);
  };

  const editZipCode = (index) => {
    setZipCode(zipList[index].zipcode);
    setAddress(zipList[index].address);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">Kode Pos Manager</h2>

      {/* Form Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Masukkan kode pos"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button onClick={searchZipCode} className="bg-blue-500 text-white px-4 py-2 rounded">
          Auto Fill
        </button>
      </div>
      <textarea
        placeholder="Alamat"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 rounded w-full mt-2"
        rows="2"
      />
      <button
        onClick={saveZipCode}
        className="bg-green-500 text-white px-4 py-2 rounded w-full mt-2"
      >
        {isEditing ? "Update" : "Save"}
      </button>

      {/* List Data */}
      <h3 className="mt-4 text-lg font-semibold">Daftar Kode Pos</h3>
      {zipList.length === 0 ? (
        <p className="text-gray-500 text-sm">Belum ada data.</p>
      ) : (
        <ul className="mt-2">
          {zipList.map((item, index) => (
            <li key={index} className="flex justify-between items-center p-2 border-b">
              <div>
                <p className="font-semibold">{item.zipcode}</p>
                <p className="text-sm text-gray-600">{item.address}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editZipCode(index)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteZipCode(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
