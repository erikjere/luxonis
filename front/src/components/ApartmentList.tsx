import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Apartment from './Apartment'
import classes from './ApartmentList.module.css'

// TODO: dynamic page limit

const ApartmentList = () => {
  const MAX_PN = 24
  const ITEMS_PER_PAGE = 24
  const { pageNumber } = useParams()
  const pn = parseInt(pageNumber!)
  const [apartments, setApartments] = useState<
    {
      apartment_id: number
      name: string
      img: string
    }[]
  >([])
  const [slice, setSlice] = useState<{ first: number; last: number }>({
    first: 0,
    last: 18,
  })
  useEffect(() => {
    const getItems = async () => {
      const res = await fetch('/api/')
      const list = await res.json()
      setApartments(list.message)
    }

    getItems()
    if (pageNumber) {
      setSlice({
        first: (pn - 1) * ITEMS_PER_PAGE,
        last: pn * ITEMS_PER_PAGE,
      })
    } else {
      setSlice({ first: 0, last: ITEMS_PER_PAGE })
    }
  }, [pageNumber])

  return (
    <div className={classes.container}>
      <div className={classes.list}>
        {apartments.slice(slice.first, slice.last).map((apartment) => (
          <Apartment
            key={apartment.apartment_id}
            name={apartment.name}
            src={apartment.img}
          />
        ))}
      </div>
      <div className={classes.navigation}>
        <button className={classes.button} disabled={pn === 1}>
          <Link
            className={
              pageNumber === '1' ? classes['link-disabled'] : classes.link
            }
            to={`../${pn - 1}`}
          >
            Previous Page
          </Link>
        </button>
        <p className={classes['page-number']}>{pageNumber ? pageNumber : 1}</p>
        <button className={classes.button} disabled={pn === MAX_PN}>
          <Link
            className={pn === MAX_PN ? classes['link-disabled'] : classes.link}
            to={`../${pn + 1}`}
          >
            Next Page
          </Link>
        </button>
      </div>
    </div>
  )
}

export default ApartmentList
