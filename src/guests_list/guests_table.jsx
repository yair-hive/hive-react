import "../style/guests_table.css"
import TableRow from "./table_row"
import React, { useContext, useEffect, useRef, useState } from "react"
import RequestsDrop from "./requestsDrop"
import { useSeatsDataAll } from "../querys/seats"
import { useGuestsData } from "../querys/guests"
import { useGuestGroupsData } from "../querys/guest_groups"
import { useTagBelongsData } from "../querys/tag_belongs"
import { useSeatBelongsData } from "../querys/seat_belongs"
import { TableRefContext } from "../pages/projects"
import { useSortBy, useTable } from "react-table";
import TagsCount from "../components/tags_count"
import { GroupsContext, TagsContext } from "../app"
import { useFilters } from "react-table/dist/react-table.development"
import RequestsCount from "../components/requestsCount"
import { useRequestsBelongsData } from "../querys/requests_belongs"

function Table({ columns, data }) {

  const [tagsStatus, setTagsStatus] = useContext(TagsContext)
  const [groupsStatus, setGroupsStatus] = useContext(GroupsContext)

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      setFilter,
    } = useTable(
      {
        columns,
        data,
      },
      useFilters,
      useSortBy,
    )
  
    useEffect(()=> {
      setFilter('tags', tagsStatus)
    }, [tagsStatus])
    useEffect(()=> {
      setFilter('group_name', groupsStatus)
    }, [groupsStatus])
    // We don't want to render all 2000 rows for this example, so cap
    // it at 20 for this use case
    const firstPageRows = rows.slice(0, 100)
  
    return (
      <>
        <table className="names_table" dir="rtl" {...getTableProps()}>
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

function filterTags(rows, columnsIds, filterValue){
  var id = columnsIds[0]
  return rows.filter((row)=>{
    var row_value = row.values[id]
    row_value = row_value.map(tag => tag.tag)
    return row_value.indexOf(filterValue) != -1 || filterValue == 'הכל'
  })
}
function filterGroups(rows, columnsIds, filterValue){
  var id = columnsIds[0]
  return rows.filter((row)=>{
    var row_value = row.values[id]
    return row_value == filterValue || filterValue == 'הכל'
  })
}
function TableInstens({data}){
    const columns = React.useMemo(
        () => [
            {
                Header: "מספר כיסא",
                accessor: "seat_number",
            },   
            {
                Header: "תגיות",
                accessor: "tags",
                Cell: TagsCount,
                filter: filterTags,
            },  
            {
                Header: "שם משפחה",
                accessor: "last_name",
            }, 
            {
                Header: "שם פרטי",
                accessor: "first_name",
            },
            {
                Header: "שיעור",
                accessor: "group_name",
                filter: filterGroups
            },  
            {
                Header: "ניקוד",
                accessor: "score",
            },  
            {
                Header: "בקשות",
                accessor: "requests",
                Cell: RequestsCount
            }, 
        ],
        []
      )

      return <Table columns={columns} data={data}/>
}
function GuestsTable(){

    const seats = useSeatsDataAll()
    const belongs = useSeatBelongsData()
    const guests = useGuestsData()
    const groups = useGuestGroupsData()
    const requests = useRequestsBelongsData()
    const tags_belongs = useTagBelongsData()

    function create_rows(){
        var rows = []
        var i = 0
        if(guests.data && belongs.data && groups.data && seats.data && tags_belongs.data && requests.data){
            var belongs_object = {}
            var seats_object = {}
            var requests_object = {}
            requests.data.forEach(request => requests_object[request.guest] = [])
            requests.data.forEach(request => requests_object[request.guest].push(request))
            belongs.data.forEach(belong => belongs_object[belong.guest] = belong)
            seats.data.forEach(seat => seats_object[seat.id] = seat)
            for(let guest of guests.data){
                i++
                var seat_id = false
                var group = groups.data[guest.guest_group]
                if(belongs_object[guest.id]) seat_id = belongs_object[guest.id].seat
                var seat = seats_object[seat_id]
                var tags = (tags_belongs.data[seat_id] ? tags_belongs.data[seat_id] : [])
                var group_score = group ? group.score : 0
                rows.push({
                    last_name: guest.last_name,
                    first_name: guest.first_name, 
                    group_name: group?.name,
                    seat_number: seat?.seat_number,
                    tags: tags,
                    score: Number(group_score) + Number(guest.score),
                    requests: requests_object[guest.id],
                })
            }
        }
        return rows
    }

    return (
        <div className="guest_table">
            <TableInstens data={create_rows()}/>
        </div>
    )
}

export default GuestsTable