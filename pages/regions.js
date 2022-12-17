import React from "react";
import dynamic from 'next/dynamic';
import 'smart-webcomponents-react/source/styles/smart.default.css';
import styles from "../styles/Home.module.css"
import { useState} from "react";
import { useCallback } from "react";
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/regions`);
  const wines = await res.json();
  return { props: { data: wines.data } };
}
const Grid = dynamic(() => import('smart-webcomponents-react/grid'), {
  ssr: false, //no server-side rendering 
  loading: () => <p>Loading...</p>
});
function Regions({ data }) {
  const [value, setValue] = useState();
  const [secondValue, setSecondValue] = useState();
  const [initialData, setInitialData] = useState(data);

  const [price, setPrice] = useState();
  const [firstPrice, setFirstPrice] = useState();

  const filterData = useCallback(() => {
    let datt = data;
    if (value && secondValue) {
      datt = data.filter(
        (item) =>
          item.points >= Math.min(value, secondValue) &&
          item.points <= Math.max(secondValue, value)
      );
    }
    if(price && firstPrice) {
      datt = datt.filter((item) => item.price >= Math.min(price, firstPrice) && item.price <= Math.max(price, firstPrice))
    }
    setInitialData(datt);
  }, [data, firstPrice, price, secondValue, value]);
  const columns = [{
    label: 'Title',
    dataField: 'title',
	width: 200
  },
  {
    label: 'Description',
    dataField: 'description', 
    width: 200
  },
  {
    label: 'Points',
    dataField: 'points', 
    width: 100
  },
  {
    label: 'Taster name',
    dataField: 'taster_name', 
    width: 200
  },
  {
    label: 'Price',
    dataField: 'price', 
    width: 100
  },
  {
    label: 'Designation',
    dataField: 'designation', 
    width: 200
  },
  {
    label: 'Variety',
    dataField: 'variety', 
    width: 200
  },
  {
    label: 'Region1',
    dataField: 'region_1', 
    width: 200
  },
  {
    label: 'Region2',
    dataField: 'region_2', 
    width: 200
  },
  {
    label: 'Province',
    dataField: 'province', 
    width: 200
  },
  {
    label: 'Country',
    dataField: 'country', 
    width: 200
  },
  {
    label: 'Winery',
    dataField: 'winery'
  }],
  
  sorting = {
	enabled: true
  },
  
  filtering = {
	enabled: true
  },
  
  selection = {
      enabled: true,
      checkBoxes: {
        enabled: true
      }
  },
	
  dataSource = initialData,
    dataSourceSettings = {
      dataFields: [
        { name: 'title', dataType: 'string' },
        { name: 'description', dataType: 'string' },
        { name: 'points', dataType: 'number' },
        { name: 'taster', dataType: 'string' },
        { name: 'price', dataType: 'nymber' },
        { name: 'designation', dataType: 'string' },
        { name: 'region', dataType: 'string' },
        { name: 'province', dataType: 'string' },
        { name: 'country', dataType: 'string' },
        { name: 'winery', dataType: 'string' },
      ]
    };
  return (
    <div className={styles.container}>

      <main className={styles.main}>
    
      <h4> Search:</h4>
        <input
        placeholder="Point"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
        <input
        placeholder="Point"
          type="number"
          value={secondValue}
          onChange={(e) => setSecondValue(e.target.value)}
        ></input>
        <input placeholder="Price" type="number" onChange={(e) => {
          setPrice(e.target.value);
        }} value={price}>
        </input>
        <input placeholder="Price" type="number" onChange={(e) => {
          setFirstPrice(e.target.value);
        }} value={firstPrice} >
        </input>
        <button onClick={() => {
          filterData();
        }}>search</button>
        <Grid id="grid" sorting={sorting} filtering={filtering} columns={columns} selection={selection} dataSource={dataSource} dataSourceSettings={dataSourceSettings}></Grid>
      </main>

    </div>
  );
}

export default Regions;
