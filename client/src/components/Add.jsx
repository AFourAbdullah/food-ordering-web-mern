import {useState} from 'react'
import styles from '../styles/Add.module.css'
import axios from 'axios'

const Add = ({setClose}) => {

    const [file, setFile] = useState();
    const [title, setTitle] = useState()
    const [category, setCategory] = useState()
    const [desc, setDesc] = useState()
    const [prices, setPrices] = useState([]);
    const [extra, setExtra] = useState();
    const [extraOptions, setExtraOptions] = useState([]);

    const changePrice = (e, index) => {
        const currentPrices = prices;
        currentPrices[index] = e.target.value;
        setPrices(currentPrices)
    }

    const handleExtraInput = (e) => {
        setExtra({...extra, [e.target.name]: e.target.value});
    }

    const handleExtra = (e) => {
        setExtraOptions(prev=>[...prev, extra])
    }

    const handleCreate = async () => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "uploads")

        try {
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dlv66jaxn/image/upload", data);
            const { url } = uploadRes.data;
            const newProduct = {
                title, category, desc, prices, extraOptions, img:url
            };

            await axios.post("http://localhost:4000/products", newProduct);
            setClose(true);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <span onClick={() =>setClose(true)} className={styles.close}>X</span>
            <h2 style={{display: 'flex', justifyContent: 'center'}}>Add a new Product</h2>
            <div className={styles.item}>
                <label className={styles.label}>Choose an image</label>
                <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Title</label>
                <input type="text" className={styles.input} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Category</label>
                <input type="text" className={styles.input} onChange={(e)=>setCategory(e.target.value)}/>
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Description</label>
                <textarea rows={4} type="text" onChange={(e)=>setDesc(e.target.value)}/>
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Prices</label>
                <div className={styles.priceContainer}>
                    <input type="number" placeholder="Small" className={`${styles.input} ${styles.inputSm}`} onChange={(e)=>changePrice(e,0)}/>
                    <input type="number" placeholder="Medium" className={`${styles.input} ${styles.inputSm}`} onChange={(e)=>changePrice(e,1)}/>
                    <input type="number" placeholder="Large" className={`${styles.input} ${styles.inputSm}`} onChange={(e)=>changePrice(e,2)}/>
                </div>
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Extra</label>
                <div className={styles.extra}>
                    <input type="text" placeholder="Item" name="text" className={`${styles.input} ${styles.inputSm}`} onChange={handleExtraInput}/>
                    <input type="number" placeholder="Price" name="price" className={`${styles.input} ${styles.inputSm}`} onChange={handleExtraInput}/>
                    <button className={styles.extraButton} onClick={handleExtra}>Add</button>
                </div>
                <div className={styles.extraItems}>
                    {extraOptions.map(option=> (
                        <span key={option.text} className={styles.extraItem}>{option.text}</span>
                    ))}
                </div>
            </div>
            <button className={styles.addButton} onClick={handleCreate}>Create</button>
            
        </div>
    </div>
  )
}

export default Add