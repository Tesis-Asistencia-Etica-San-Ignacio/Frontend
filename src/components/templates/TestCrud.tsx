import { useState } from "react";
import { 
  useCreateUser, 
  useDeleteUser, 
  useUpdateUser, 
  useGetAllUsers, 
  useGetUserById 
} from "../../hooks";

export default function TestCrud() {
  const createUser = useCreateUser();
  const deleteUser = useDeleteUser();
  const updateUser = useUpdateUser();
  const { data: users, refetch } = useGetAllUsers();
  const [userId, setUserId] = useState("");

  // Hook para obtener usuario por ID (se habilita solo cuando hay un ID)
  const { data: userById, refetch: refetchUserById } = useGetUserById(userId);

  const handleCreate = () => {
    createUser.mutate({
      name: "lala2boba",
      last_name: "Blanco",
      email: "lalabob2a@example.com",
      password: "123456",
      type: "INVESTIGADOR", // Asegúrate de usar los valores correctos
    }, {
      onSuccess: (data) => console.log("Usuario creado:", data),
    });
  };
  

  const handleGetUsers = () => {
    refetch();
    console.log("Usuarios obtenidos:", users);
  };

  const handleGetUserById = () => {
    if (!userId) return alert("Ingresa un ID de usuario válido");
    refetchUserById();  // Llama a la consulta para obtener el usuario
    console.log("Usuario obtenido por ID:", userById);
  };

  const handleUpdate = () => {
    if (!userId) return alert("Ingresa un ID de usuario válido");
    updateUser.mutate(
      { id: userId, name: "Nieve" },
      { onSuccess: (data) => console.log("Usuario actualizado:", data) }
    );
  };

  const handleDelete = () => {
    if (!userId) return alert("Ingresa un ID de usuario válido");
    deleteUser.mutate(userId, {
      onSuccess: () => console.log(`Usuario con ID ${userId} eliminado`),
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Test CRUD</h2>

      <div className="space-y-2">
        <button onClick={handleCreate} className="px-4 py-2 bg-green-500 text-white rounded">
          Create User
        </button>

        <button onClick={handleGetUsers} className="px-4 py-2 bg-blue-500 text-white rounded">
          Get All Users
        </button>

        <input 
          type="text" 
          placeholder="User ID" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)} 
          className="border px-2 py-1"
        />

        <button onClick={handleGetUserById} className="px-4 py-2 bg-gray-500 text-white rounded">
          Get User by ID
        </button>

        <button onClick={handleUpdate} className="px-4 py-2 bg-yellow-500 text-white rounded">
          Update User
        </button>

        <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">
          Delete User
        </button>
      </div>
    </div>
  );
}
