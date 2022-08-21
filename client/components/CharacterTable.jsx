import React, { useEffect, useState } from 'react'
import { useTable, usePagination } from 'react-table'
import { getMarvelCharacters } from '../apis/characters'

export default function CharacterTable() {
  // table has ID, Name, Description, resourceURI, Thumbnail, "Details" is a button to show as a Modal

  const [charactersList, setCharactersList] = useState([])

  useEffect(() => {
    getMarvelCharacters().then((res) => {
      // console.log(res)
      setCharactersList(res.data.results)
    })
  }, [])

  const data = React.useMemo(
    () =>
      charactersList.map((character, i) => {
        const imageSource = `${character.thumbnail.path}.${character.thumbnail.extension}`
        return {
          id: character.id,
          name: character.name,
          description: character.description,
          resourceUri: character.resourceURI,
          thumbnail: (
            <img
              key={character.id}
              src={imageSource}
              width="100px"
              height="100px"
            />
          ),
          details: <button>Details</button>, // TODO: click on button open modal
        }
      }),
    [charactersList]
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Resource URI',
        accessor: 'resourceUri',
      },
      {
        Header: 'Thumbnail',
        accessor: 'thumbnail',
      },
      {
        Header: 'Details',
        accessor: 'details',
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  )

  return (
    <>
      <div alt="The characters table" className="characters-table">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr key={i} {...row.getRowProps()}>
                  {row.cells.map((cell, j) => {
                    return (
                      <td key={j} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}
