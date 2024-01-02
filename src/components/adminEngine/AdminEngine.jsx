import AdminComponent from "../../custom/AdminComponent/AdminComponent";

const AdminEngine = ({ name }) => {
  const emptyObject = {
    name: "",
    power: "",
    volume: "",
  };

  const baseUrl = "http://lakilab-001-site2.ctempurl.com";
  const urls = [
    `${baseUrl}/Engine/InputEngine`,
    `${baseUrl}/Engine/GetEngines`,
  ];

  let dataEntries = [
    {
      name: "Naziv",
      value: "name",
    },
    {
      name: "Snaga",
      value: "power",
    },
    {
      name: "Zapremina",
      value: "volume",
    },
  ];

  return (
    <AdminComponent
      name={name}
      emptyObject={emptyObject}
      urls={urls}
      dataEntries={dataEntries}
    />
  );
};

export default AdminEngine;
