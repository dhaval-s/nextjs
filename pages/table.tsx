import React, { useState, useEffect } from "react";
import {Column, Table, SortDirection, SortDirectionType} from 'react-virtualized';
import 'react-virtualized/styles.css';
import _ from "lodash";

interface SortInfo {
sortBy: string;
sortDirection: SortDirectionType;
}

export function Dtable() {
    const [data, setData] = useState(null)
    const [sortBy, setSortBy] =  useState<string>("ServiceName")
    const [sortDirection, setSortDirection] = useState<SortDirectionType>("ASC");
    const [sortedList, setSortedList] = useState(null);

    useEffect(() => {
      fetch('https://engineering-task.elancoapps.com/api/raw')
        .then((res) => res.json())
        .then((data) => {
          setSortedList(data)
          setData(data)
        })
    }, [])
    
    if (!data) return <div>Loading...</div>

    const list = data;

    // eslint-disable-next-line no-shadow
    function _sortList({ sortBy, sortDirection }: SortInfo) {
      const newList = _.sortBy(list, [sortBy]);
      if (sortDirection === SortDirection.DESC) {
        newList.reverse();
      }
      return newList;
    }

    // eslint-disable-next-line no-shadow
    function _sort({ sortBy, sortDirection }: SortInfo) {
      setSortBy(sortBy);
      setSortDirection(sortDirection);
      setSortedList(_sortList({ sortBy, sortDirection }));
    }

    function _cellRenderer(dataKey: string, rowIndex: number) {
      return (
        <>
          <div
            data-index={rowIndex}
            role="gridcell"
            style={dataKey === "status" ? { color: "green" } : {}}
          >
            {sortedList[rowIndex][dataKey]}
          </div>
        </>
      );
    }
    
  return (
    <Table
      width={1300}
      height={500}
      headerHeight={50}
      flexGrow={1}
      rowHeight={40}
      rowCount={list.length}
      sort={_sort}
      sortBy={sortBy}
      sortDirection={sortDirection}
     rowGetter={({index}) => list[index]}>        
      <Column 
          width={250} 
          label="Service Name" 
          dataKey="ServiceName" 
          cellRenderer={({ dataKey, rowIndex }) =>
            _cellRenderer(dataKey, rowIndex)
          }
          />

      <Column 
          label="Resource Group" 
          dataKey="ResourceGroup" 
          width={200} 
          cellRenderer={({ dataKey, rowIndex }) =>
            _cellRenderer(dataKey, rowIndex)
          }
          />

      <Column 
          width={200} 
          label="Consumed Quantity" 
          dataKey="ConsumedQuantity" 
          cellRenderer={({ dataKey, rowIndex }) =>
            _cellRenderer(dataKey, rowIndex)
          } 
          />

      <Column 
          width={100} 
          label="Cost" 
          dataKey="Cost" 
          cellRenderer={({ dataKey, rowIndex }) =>
            _cellRenderer(dataKey, rowIndex)
          }
          />

      <Column 
          width={100} 
          label="Date" 
          dataKey="Date" 
          cellRenderer={({ dataKey, rowIndex }) =>
            _cellRenderer(dataKey, rowIndex)
          }
          />

      <Column 
          width={200} 
          label="Unit Of Measure" 
          dataKey="UnitOfMeasure" 
          cellRenderer={({ dataKey, rowIndex }) =>
            _cellRenderer(dataKey, rowIndex)
          }
          />

      <Column 
          width={150} 
          label="Location" 
          dataKey="Location" 
          cellRenderer={({ dataKey, rowIndex }) =>
            _cellRenderer(dataKey, rowIndex)
          }
          />
  </Table>
  );
}
