import React, { useState } from "react";
import { useSortBy, useTable } from "react-table";
import PopUp from "../hive_elements/pop_up";
import { useTagsData, useTagsDelete, useTagsUpdate } from "../querys/tags";

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20)

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
      </table>
    </>
  )
}

function ColorInput({tag_id, color}){

    const [colorState, setColor] = useState(null)
    const update_color = useTagsUpdate().color

    function onChange(event){
        setColor(event.target.value)
    }

    function onBlur(){
        update_color({tag_id, color: colorState})
    }

    return(
        <input 
            type={'color'} 
            value={color}
            onChange={onChange}
            onBlur={onBlur}
        />
    )
}

function TdX({tag_id}){

    console.log(tag_id)

    const delete_tag = useTagsDelete()

    function onClick(){
        delete_tag({tag_id})
    }

    return(
        <td className="td_x" onClick={onClick}> X </td>
    )
}

function TableInstens({data}){

    console.log(data)
    
    const columns = React.useMemo(
        () => [
          {
            Header: 'צבע',
            accessor: 'color', 
          },
          {
            Header: 'ניקוד',
            accessor: 'score',
          },
          {
            Header: 'שם',
            accessor: 'name',
          },
        ],
        []
      )

      return <Table columns={columns} data={data}/>
}
function TagsPop(props) {

    const tags = useTagsData()

    var data = undefined
    if(tags.data){
        var data = Object.entries(tags.data).map(([key, value]) => value)
    }
    // function create_tag_tds(){
    //     if(tags.data){
    //         var tr_elements = []
    //         var new_tags = Object.entries(tags.data)
    //         for(let [tag_key, tag] of new_tags){
    //             var tr = <tr key={tag_key}>
    //                     <TdX tag_id={tag.id}/>
    //                     <td className="td_color"> <ColorInput color = {tag.color} tag_id={tag.id}/> </td>
    //                     <td> {tag.score} </td>
    //                     <td> {tag.name} </td>
    //                 </tr>
    //             tr_elements.push(tr)
    //         }
    //         return tr_elements
    //     }
    //     return 'loading...'

    // }
    if(tags.data){
        return (
            <PopUp 
            status={props.status} 
            setState = {props.setState}
            title = 'תגיות'
            >
                {/* <table id="tags_table">
                    <tbody>
                    <tr>
                        <th> X </th>
                        <th> צבע </th>
                        <th> ניקוד </th>
                        <th> שם </th>
                    </tr>
                    {create_tag_tds()}
                    </tbody>
                </table> */}
                <TableInstens data={data} />
            </PopUp>
            );
    }
}

export default TagsPop;