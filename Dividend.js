/*
Kode saham = K
Dividend Yield = DY
PB = Pengeluaran bulanan
Price = P
Lot = L
*/

document.addEventListener("DOMContentLoaded", function () {
    var inputNumber = document.getElementById('LLabel');
    var saveData = localStorage.getItem('LLabel') ? JSON.parse(localStorage.getItem('LLabel')) : [];

    inputNumber.addEventListener('input', function () {
        saveData.push(inputNumber.value);
        localStorage.setItem('LLabel', JSON.stringify(saveData));
    });
    
    document.getElementById("submitKButton").onclick = function () {

        var K = document.getElementById("KTextBox").value;
        let PB = document.getElementById("PBTextBox").value;

        if (!K || !PB) {
            alert("Silahkan isi semua tabel dulu Kawan!")
        } else {
        // Tampilkan div "LabelInput"
        var labelInputDiv = document.getElementById("LabelInput");
        labelInputDiv.style.display = "block";

        // Tambahkan input textbox untuk DY dan P
        document.getElementById("DYLabel").innerHTML = "Berapa Dividen Yield saham " + K + " saat ini?";
        var DYLabel = document.getElementById("DYLabel"); // Ambil elemen dengan id "DYLabel"
        DYLabel.appendChild(document.createElement("br")); // Tambahkan elemen <br> (baris baru) sebelum input
        var DYTextBox = document.createElement("input"); // Buat elemen <input>
        DYTextBox.id = "DYTextBox";
        DYTextBox.type = "number";
        DYTextBox.placeholder = "  %";
        DYLabel.appendChild(DYTextBox); // Tambahkan elemen input ke dalam "DYLabel"

        document.getElementById("PLabel").innerHTML = "Berapa harga saham " + K + " saat ini?";
        var PLabel = document.getElementById("PLabel"); // Ambil elemen dengan id "PLabel"
        PLabel.appendChild(document.createElement("br")); // Tambahkan elemen <br> (baris baru) sebelum input
        var PTextBox = document.createElement("input"); // Buat elemen <input>
        PTextBox.id = "PTextBox";
        PTextBox.type = "text";
        PTextBox.setAttribute("oninput", "formatCurrency(this)");
        PTextBox.setAttribute("onkeypress","return event.charCode >= 48 && event.charCode <= 57")
        PLabel.appendChild(PTextBox); // Tambahkan elemen input ke dalam "PLabel"

        var submitButton = document.getElementById("submitButton");
        submitButton.style.display = "block";

        function formatCurrency(input) {
            let value = input.value.replace(/[\.,]/g, ''); //Hapus tanda titik dan koma
            input.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');  //Format angka dengan tanda titik
        } 

        }     
    }

    document.getElementById("submitButton").onclick = function () {

        var K = document.getElementById("KTextBox").value;

        let PB = document.getElementById("PBTextBox").value;
        PB = parseCurrency(PB);

        let DY = document.getElementById("DYTextBox").value;
        DY = parseFloat(DY);

        let P = document.getElementById("PTextBox").value;
        P = parseCurrency(P);

        function parseCurrency(currency) {
            // Hapus semua karakter kecuali angka dan tanda titik
            const cleanedValue = currency.replace(/[^\d.]+/g, "");
            // Ganti semua tanda titik dengan string kosong agar tidak mempengaruhi format angka
            return parseFloat(cleanedValue.replace(/\./g, ""));
        }

        PB = PB*12;
        P = P * 100;
        DY = DY/100;
        let L = PB/(DY*P);
        L = Math.ceil(L);

        P = L*P;
        
        document.getElementById("L").innerHTML = "Sobat, kamu perlu membeli saham " + K + " sebanyak " + L + 
        " lot dengan total nilai investasi sebesar "  + formatCurrencyIDR(P) + 
        " sehingga dividennya dapat memenuhi dana kebutuhanmu dalam 1 tahun!"
    }

    function formatCurrencyIDR(amount) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    }
});
