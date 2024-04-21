import { useEffect } from "react";
import {
  createResource,
  deleteReource,
  getAll,
  updateResource,
} from "../../../services/crudServices";
import { useState } from "react";
import IconByName from "./../IconByName/index";
import moment from "moment";
import { camelCaseToWords } from "../../../utils/camelCaseToWords";
import { BsTrash, BsPen } from "react-icons/bs";
import ConrnerButton from "./../CornerButton/index";
import { AnimatePresence } from "framer-motion";
import FormBuilder from "../../formBuilder";
import Modal from "../../Modal";
import { showToast } from "../../../utils/showToast";
import Button from "../Button";
import useLocale from "../../../contexts/LocaleContext";
const Crud = ({ name, fields, formConfig }) => {
  const { t } = useLocale();
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [deletedId, setDeletedId] = useState();
  const [updatedId, setUpdatedId] = useState();

  const close = () => {
    setModalOpen(false);
    setDeletedId(null);
  };
  const open = () => setModalOpen(true);

  const handleDeleteResource = async () => {
    if (!deletedId) return;
    await deleteReource(name, deletedId);

    setData((prev) => prev.filter((item) => item._id !== deletedId));
    handleHideDeleteModal();
    showToast(`${name} is deleted successfully`, "success");
  };

  const showEditModal = (resourceId) => {
    setUpdatedId(resourceId);
    open();
  };
  const showCreateModal = () => {
    setUpdatedId(null);
    open();
  };
  const handleShowDeleteModal = (resourceId) => {
    setConfirm(true);
    setDeletedId(resourceId);
  };

  const handleHideDeleteModal = () => {
    setConfirm(false);
    setDeletedId(null);
  };

  const getAllResources = async () => {
    const resources = await getAll(name);
    setData(resources);
  };
  useEffect(() => {
    getAllResources();
  }, []);

  const onSubmit = async (data) => {
    if (updatedId) {
      // update
      await updateResource(name, updatedId, data);

      // setData(prev => {
      //   const index = prev.findIndex(p => p._id === updatedId)
      //   const oldResource = Object.assign({} , prev[index])

      //   prev[index] = {...oldResource , ...updated}
      //   return prev
      // })
      close();
      showToast(`${name} is updated successfully`, "success");
    } else {
      //create
      const newRecord = await createResource(name, data);
      setData((prev) => [newRecord, ...prev]);
      close();
      showToast(`${name} is created successfully`, "success");
    }

    await getAllResources();
  };

  const getSingleRowData = (item) => {
    return (
      <>
        {fields.map((field) => (
          <td className="px-6 py-4" key={field.name}>
            <HandleDataType field={field} item={item} />
          </td>
        ))}

        <td className="px-6 py-4">
          <BsPen
            onClick={() => showEditModal(item._id)}
            color="white"
            size={30}
            className="bg-primary-1 p-2 cursor-pointer rounded-sm shadow-sm text-white"
          />
        </td>

        <td className="px-6 py-4">
          <BsTrash
            onClick={() => handleShowDeleteModal(item._id)}
            color="white"
            size={30}
            className="bg-red-500 p-2 cursor-pointer rounded-sm shadow-sm text-white"
          />
        </td>
      </>
    );
  };

  const HandleDataType = ({ field, item }) => {
    const type = field.type;

    if (type === "list") {
      const [arrayName, keyName] = field.name.split(".");

      const arr = item[arrayName];
      return (
        <ul>
          {arr?.map((item, i) => (
            <li className="list-disc" key={i}>
              {item[keyName]}
            </li>
          ))}
        </ul>
      );
    }

    if (type === "combo") {
      const [arrName, keys] = field.name.split(":");
      const keysArr = keys.split(",");

      const arr = item[arrName];

      const results = [];

      arr.forEach((item) => {
        const oneItem = [];
        keysArr.forEach((key) => {
          if (key.includes(".")) {
            const [parent, child] = key.split(".");
            oneItem.push(item[parent][child]);
          } else oneItem.push(item[key]);
        });
        results.push(oneItem.join(" , "));
      });

      return (
        <ul>
          {results?.map((item, i) => (
            <li className="list-disc" key={i}>
              {item}
            </li>
          ))}
        </ul>
      );
    }
    if (type === "relation") {
      const [parent, child] = field.name.split(".");

      const objValue = item[parent];
      if (!objValue)
        return <span className="text-red-700">This {parent} was deleted</span>;
      return <span className="text-white">{objValue[child]}</span>;
    }
    const value = item[field.name];
    if (type === "text") return <span className="text-white">{value}</span>;
    if (type === "icon") return <IconByName color="white" name={value} />;
    if (type === "date")
      return (
        <span className="text-white">
          {value ? moment(value).format(field?.format || "D MMMM YYYY") : ""}
        </span>
      );
  };

  return (
    <div className="relative overflow-x-auto shadow-2xl rounded-lg h-full">
      <table className="w-full text-sm text-left text-gray-500 bg-primary-4 rounded-lg">
        <thead className="text-md text-primary-0 uppercase bg-primary-5 ">
          <tr>
            {fields.map((field) => (
              <th
                key={field.name}
                scope="col"
                className="px-6 py-3 normal-case"
              >
                {t(camelCaseToWords(field.header || field.name))}
              </th>
            ))}
            <th scope="col" className="px-6 py-3">
              {t("EDIT")}
            </th>
            <th scope="col" className="px-6 py-3">
              {t("DELETE")}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr
              key={item._id}
              className={i % 2 == 0 ? "bg-primary-4" : "bg-primary-5"}
            >
              {getSingleRowData(item)}
            </tr>
          ))}
        </tbody>
      </table>

      {/* no data  */}
      {!data.length && (
        <h2 className="text-3xl text-gray-200 my-7 text-center">
          No data found
        </h2>
      )}

      <ConrnerButton onClick={showCreateModal} />
      <AnimatePresence initial={false} onExitComplete={() => null}>
        {/* create & edit modal */}
        {modalOpen && (
          <Modal
            title={`${updatedId ? "Update" : "Create"} ${name}`}
            handleClose={close}
          >
            <FormBuilder
              config={formConfig(onSubmit)}
              updatedId={updatedId}
              name={name}
            />
          </Modal>
        )}

        {/* confirm delete modal */}

        {confirm && (
          <Modal title={`Are you sure ?`} handleClose={handleHideDeleteModal}>
            <div className="flex items-center justify-center mt-7 gap-10">
              <Button onClick={handleDeleteResource} variant="error">
                Delete
              </Button>
              <Button onClick={handleHideDeleteModal} variant="default">
                Cancel
              </Button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Crud;
