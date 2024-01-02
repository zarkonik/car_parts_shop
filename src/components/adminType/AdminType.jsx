import AdminComponent from "../../custom/AdminComponent/AdminComponent";

const AdminType = ({ name }) => {
  const emptyObject = {
    name: "",
    picture: "",
  };

  const baseUrl = "http://lakilab-001-site2.ctempurl.com";
  const urls = [`${baseUrl}/Type/InputType`, `${baseUrl}/Type/GetTypes`];

  let dataEntries = [
    {
      name: "Naziv",
      value: "name",
    },
    {
      name: "Slika",
      value: "picture",
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

export default AdminType;
