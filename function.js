// memanggil module fs(filesystem) dengan metode require
const fs = require('fs');

// memanggil module validator dengan metode require
const validator = require('validator');

//membuat logika apabila folder sudah dibuat atau belum
const dirPath = './data'
if (!fs.existsSync(dirPath)) {

    //membuat folder
    fs.mkdirSync(dirPath);
}

//membuat funsi loadData
const loadContact = () => {
    const file = fs.readFileSync('./data/contacts.json', 'utf8');
    const contacts = JSON.parse(file);
    return contacts;
}

//membuat logika apakah file constacts.json sudah dibuat atau belum
const dataPath = './data/contacts.json'
if (!fs.existsSync(dataPath)) {

    //membuat file
    fs.writeFileSync(dataPath, '[]', 'utf-8')
}

//membuat function dengan nama savedata dengan parameter name,email,tlp
const savedata = (name, email, tlp) => {
    // menyimpan nilai dari parameter menjadi objek 
    const contact = { name, email, tlp };
    //memanggil function loadData dan menyimpannya di variable contacts
    const contacts = loadContact()

    // //membuat logika dengan me-validasi data menggunakan validator
    if (!validator.isAlpha(name, 'en-US', { ignore: ' ' }) == true) {
        console.log('Your name is wrong format');
        rl.close()
        return (false)
    }
    if (!validator.isEmail(email) == true) {
        console.log('Your email is wrong format');
        return (false)
    }
    if (!validator.isMobilePhone(tlp, 'id-ID') == true) {
        console.log('Your number phone is wrong format');
        return (false)
    }
    const duplicate = contacts.find((contact) => contact.name === name)
    if (duplicate) {
        console.log("name already exists");
        return false
    }

    //memasukan data kedalam format json
    contacts.push(contact);
    console.log("data added")
    console.log(`name: ${name}\temail: ${email}\ttlp${tlp}`);
    //menuliskan data kedalam file contacts.json
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
}

//membuat fungsi menampilkan semua data
const show = () =>{
    //memanggil fungsi loadContact
    const contacts = loadContact()
    // membuat perulangan dengan foreach
    contacts.forEach(contacts => {
        //menampilkan data ke terminal
        console.log(`Nama : ${contacts.name} \tEmail : ${contacts.email}\tTelpon : ${contacts.tlp}`);
    });
}

//membuat fungsi hapus data
const deleted = (name) =>{
    //memanggil fungsi loadContact
    const contents = loadContact()
    //memfilter data tidak sama dengan nama
    const fil = contents.filter(contact => contact.name !== name)

    //membuat logika apabila data tidak ada didalam filter maka akan menulis ulang ke dalam file
    if (fil){
    //menampilkan ke terminal
    console.log(`Delete data where Name: ${name}`);
    //menuis ulang contacts.json
    fs.writeFileSync('data/contacts.json', JSON.stringify(fil));

}
}
//meng-export module
module.exports = { savedata, show, deleted}