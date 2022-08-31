import classes from './Apartment.module.css'

const Apartment = (props: { name: string; src: string }) => {
  return (
    <div className={classes.container}>
      <img className={classes.image} src={props.src} alt="Apartment photo" />
      <p className={classes.name}>{props.name}</p>
    </div>
  )
}

export default Apartment
