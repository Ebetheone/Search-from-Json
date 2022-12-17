import dynamic from "next/dynamic";
import "smart-webcomponents-react/source/styles/smart.default.css";
import styles from "../styles/Home.module.css";
import React, { useCallback, useState } from "react";
import { Button, Modal, InputNumber } from "antd";
import HashLoader from "react-spinners/HashLoader";

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/regions`);
  const wines = await res.json();
  return { props: { data: wines.data } };
}
const Grid = dynamic(() => import("smart-webcomponents-react/grid"), {
  ssr: false, //no server-side rendering
  loading: () => <HashLoader color="#36d7b7" />,
});

function Regions({ data }) {
  const [value, setValue] = useState();
  const [secondValue, setSecondValue] = useState();
  const [initialData, setInitialData] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    filterData();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
    if (price && firstPrice) {
      datt = datt.filter(
        (item) =>
          item.price >= Math.min(price, firstPrice) &&
          item.price <= Math.max(price, firstPrice)
      );
    }
    setInitialData(datt);
  }, [data, firstPrice, price, secondValue, value]);
  const columns = [
      {
        label: "Title",
        dataField: "title",
        width: 200,
      },
      {
        label: "Description",
        dataField: "description",
        width: 200,
      },
      {
        label: "Points",
        dataField: "points",
        width: 100,
      },
      {
        label: "Taster name",
        dataField: "taster_name",
        width: 200,
      },
      {
        label: "Price",
        dataField: "price",
        width: 100,
      },
      {
        label: "Designation",
        dataField: "designation",
        width: 200,
      },
      {
        label: "Variety",
        dataField: "variety",
        width: 200,
      },
      {
        label: "Region1",
        dataField: "region_1",
        width: 200,
      },
      {
        label: "Region2",
        dataField: "region_2",
        width: 200,
      },
      {
        label: "Province",
        dataField: "province",
        width: 200,
      },
      {
        label: "Country",
        dataField: "country",
        width: 200,
      },
      {
        label: "Winery",
        dataField: "winery",
      },
    ],
    sorting = {
      enabled: true,
    },
    filtering = {
      enabled: true,
    },
    selection = {
      enabled: true,
      checkBoxes: {
        enabled: true,
      },
    },
    dataSource = initialData,
    dataSourceSettings = {
      dataFields: [
        { name: "title", dataType: "string" },
        { name: "description", dataType: "string" },
        { name: "points", dataType: "number" },
        { name: "taster", dataType: "string" },
        { name: "price", dataType: "nymber" },
        { name: "designation", dataType: "string" },
        { name: "region", dataType: "string" },
        { name: "province", dataType: "string" },
        { name: "country", dataType: "string" },
        { name: "winery", dataType: "string" },
      ],
    };

  const onChangeOne = (value) => {
    setValue(value);
  };
  const onChangeTwo = (value) => {
    setSecondValue(value);
  };
  const onChangeThree = (value) => {
    setPrice(value);
  };
  const onChangeFour = (value) => {
    setFirstPrice(value);
  };

  return (
    <div className={styles.container}>
      <Grid
        id="grid"
        sorting={sorting}
        filtering={filtering}
        columns={columns}
        selection={selection}
        dataSource={dataSource}
        dataSourceSettings={dataSourceSettings}
      ></Grid>
      <div className={styles.part}>
        <Button
          type="primary"
          onClick={showModal}
          style={{ width: 120, height: 35 }}
        >
          search
        </Button>
        <Modal
          title="Search:"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className={styles.shit}>
            <InputNumber
              onChange={onChangeOne}
              placeholder="Point"
              maxLength={2}
              style={{ width: 150, marginLeft: 50 }}
            />
            <InputNumber
              onChange={onChangeTwo}
              placeholder="Point"
              maxLength={2}
              style={{ width: 150, marginLeft: 20 }}
            />
            <InputNumber
              onChange={onChangeThree}
              placeholder="Price"
              maxLength={2}
              style={{ width: 150, marginLeft: 50 }}
            />
            <InputNumber
              onChange={onChangeFour}
              placeholder="Price"
              maxLength={2}
              style={{ width: 150, marginLeft: 20 }}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Regions;
