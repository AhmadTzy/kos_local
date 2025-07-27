// Daftar penyewa kos, data awal
const dataKos = [
  { nomor: "1", nama: "Ayu", bayar: "" },
  { nomor: "2", nama: "Budi", bayar: "" },
  { nomor: "3", nama: "Citra", bayar: "" },
  { nomor: "4", nama: "Dedi", bayar: "" },
  { nomor: "5", nama: "Ay", bayar: "" },
  { nomor: "6", nama: "Bui", bayar: "" },
  { nomor: "7", nama: "Cira", bayar: "" },
  { nomor: "8", nama: "Ded", bayar: "" },
];

function tambah30Hari(tanggalStr) {
  if (!tanggalStr) return null;
  const tgl = new Date(tanggalStr);
  tgl.setDate(tgl.getDate() + 30);
  return tgl.toISOString().split("T")[0];
}

function hitungSisaHari(targetStr) {
  if (!targetStr) return null;
  const hariIni = new Date();
  const target = new Date(targetStr);
  const selisih = target - hariIni;
  return Math.ceil(selisih / (1000 * 60 * 60 * 24));
}

function tampilkanData() {
  const tbody = document.querySelector("#kosTable tbody");
  tbody.innerHTML = "";

  const dataDenganPerhitungan = dataKos.map((item, index) => {
    const habis = tambah30Hari(item.bayar);
    const sisaHari = habis ? hitungSisaHari(habis) : null;
    return { ...item, habis, sisaHari, index };
  });

  // Urutkan berdasarkan sisa hari
  dataDenganPerhitungan.sort((a, b) => {
    if (a.sisaHari === null) return 1;
    if (b.sisaHari === null) return -1;
    return a.sisaHari - b.sisaHari;
  });

  dataDenganPerhitungan.forEach((item) => {
    const tr = document.createElement("tr");

    if (item.sisaHari !== null) {
      if (item.sisaHari <= 3) {
        tr.classList.add("red-warning");
      } else if (item.sisaHari <= 7) {
        tr.classList.add("orange-warning");
      }
    }

    tr.innerHTML = `
          <td>${item.nomor}</td>
          <td>${item.nama}</td>
          <td>${item.bayar || "-"}</td>
          <td>${item.habis || "-"}</td>
          <td>${item.sisaHari !== null ? item.sisaHari + " hari" : "-"}</td>
          <td>
            <input type="date" value="${item.bayar}" onchange="updateBayar(${
      item.index
    }, this.value)">
          </td>
        `;
    tbody.appendChild(tr);
  });
}

function updateBayar(index, value) {
  dataKos[index].bayar = value;
  tampilkanData();
}

tampilkanData();
setInterval(tampilkanData, 60 * 1000); // Update otomatis setiap 1 menit
