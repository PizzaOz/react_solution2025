// import { Table } from 'antd';
// import { useSolution } from 'react-solution';
// import { useEffect, useState } from 'react';
// import { COUNTRIES_STORE } from '../countries/tokens';
// import type { Country } from '../countries/types';

// export const CountriesList = () => {
//   const store = useSolution(COUNTRIES_STORE);
//   const [countries, setCountries] = useState<Country[]>([]);

//   useEffect(() => {
//     const updateCountries = () => {
//       const currentState = store.state.get();
//       setCountries(currentState.list);
//     };

//     const unsubscribe = store.state.subscribe(updateCountries);

//     updateCountries();
//     store.init();
    
//     return () => unsubscribe();
//   }, [store]);

//   const columns = [
//     { title: 'ID', dataIndex: '_id', key: '_id', width: 100 },
//     { title: 'Название', dataIndex: 'title', key: 'title' }
//   ];

//   return (
//     <Table
//       dataSource={countries}
//       columns={columns}
//       rowKey="_id"
//       pagination={false}
//       size="small"
//       bordered
//     />
//   );
// };