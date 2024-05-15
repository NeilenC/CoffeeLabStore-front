// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import { SubCategory } from '@/commons/types.interface';

// const CreateCategoryPage = () => {
//   const router = useRouter();

//   const [categoryName, setCategoryName] = useState('');
//   const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
//   const [newSubcategory, setNewSubcategory] = useState('');

//   const handleAddSubcategory = () => {
//     if (newSubcategory.trim() !== '') {
//       setSubcategories([...subcategories, newSubcategory]);
//       setNewSubcategory('');
//     }
//   };

//   const handleCreateCategory = async () => {
//     try {
//       const response = await fetch('${process.env.BASE_URL}/categories/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           categoryName,
//           subcategories,
//         }),
//       });

//       if (response.ok) {
//         // Si la respuesta es exitosa, redirige a la página de creación de subcategorías
//         router.push('/subcategories/create');
//       } else {
//         // Manejar errores de respuesta del servidor
//         console.error('Error al crear la categoría');
//       }
//     } catch (error) {
//       // Manejar errores de red o cualquier otro tipo de error
//       console.error('Error de red:', error);
//     }
//   };

//   const handleCreateSubCategory = async () => {
//     try {
//       const createSubCategoryDTO = {
//         name: subCategoryName,
//         category: categoryId,
//       };

//       const response = await fetch('/api/createSubCategory', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(createSubCategoryDTO),
//       });

//       if (response.ok) {
//         router.push('/subcategories');
//       } else {
//         console.error('Error al crear la subcategoría');
//       }
//     } catch (error) {
//       console.error('Error de red:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Create Category</h1>
//       <label>
//         Category Name:
//         <input
//           type="text"
//           value={categoryName}
//           onChange={(e) => setCategoryName(e.target.value)}
//         />
//       </label>

//       <div>
//         <h2>Subcategories:</h2>
//         <ul>
//           {subcategories.map((subcategory, index) => (
//             <li key={index}>{}</li>
//           ))}
//         </ul>
//         <label>
//           New Subcategory:
//           <input
//             type="text"
//             value={newSubcategory}
//             onChange={(e) => setNewSubcategory(e.target.value)}
//           />
//         </label>
//         <button onClick={handleAddSubcategory}>Add Subcategory</button>
//       </div>

//       <button onClick={handleCreateCategory}>Create Category</button>
//     </div>
//   );
// };

// export default CreateCategoryPage;
