"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function Dashboard() {
  const [userData, setUserData] = useState<any>(null);
  const [editableData, setEditableData] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;

    axios
      .get("https://nodejs-server-for-unity3dgame-login-5vxc.onrender.com/u3d/getGameDataSecured", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.code === 0) {
          setUserData(res.data.userData);
          setEditableData(res.data.userData);
        } else {
          alert("Unauthorized or session expired.");
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (field: string, value: number) => {
    setEditableData({ ...editableData, [field]: value });
  };

  const saveChanges = async () => {
    if (!editableData || !editableData.username) return;
    setSaving(true);

    try {
      const res = await axios.put("https://nodejs-server-for-unity3dgame-login-5vxc.onrender.com/u3d/saveGameData", {
        username: editableData.username,
        gameData: {
          gold: editableData.gold,
          gems: editableData.gems,
          level: editableData.level,
        },
      });

      if (res.data.code === 0) {
        alert("Game data saved successfully!");
        setUserData({ ...editableData }); // Update UI with new data
      } else {
        alert("Failed to save data.");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Error saving game data.");
    } finally {
      setSaving(false);
    }
  };

  if (!editableData) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-lg mx-auto space-y-4">
      <h2 className="text-xl font-bold">Welcome, {editableData.username}</h2>

      {editableData.profilePic && (
        <img
          src={editableData.profilePic}
          alt="Profile"
          className="w-32 h-32 rounded-full"
        />
      )}

      <div>
        <label className="block font-semibold">Gold:</label>
        <input
          type="number"
          value={editableData.gold}
          onChange={(e) => handleChange("gold", parseInt(e.target.value))}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <div>
        <label className="block font-semibold">Gems:</label>
        <input
          type="number"
          value={editableData.gems}
          onChange={(e) => handleChange("gems", parseInt(e.target.value))}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <div>
        <label className="block font-semibold">Level:</label>
        <input
          type="number"
          value={editableData.level}
          onChange={(e) => handleChange("level", parseInt(e.target.value))}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <button
        onClick={saveChanges}
        disabled={saving}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
