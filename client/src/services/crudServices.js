import api from "./../Api/axios";

export const getAll = async (name) => {
  return (await api.get(name)).data;
};

export const getOne = async (name , id) => {
  return (await api.get(`${name}/${id}`)).data;
};


export const createResource = async (name, data) => {
  return (await api.post(name, data)).data;
};


export const deleteReource = async (name , id) => {
  return (await api.delete(`${name}/${id}`)).data;
};



export const updateResource = async (name , id , data) => {
  return (await api.put(`${name}/${id}` , data)).data;
};
