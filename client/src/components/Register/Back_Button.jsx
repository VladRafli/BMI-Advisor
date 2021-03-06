import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function BackButton({ to }) {
  return (
    <Link to={to}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </Link>
  )
}
