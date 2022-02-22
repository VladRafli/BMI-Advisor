import { useRecoilState } from 'recoil'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Graph from '../Misc/Graph'
import { userState } from '../../pages/Dashboard'

export default function Main() {
  const user = useRecoilState(userState)
  return (
    <>
      <h1>Welcome back, user!</h1>
      <p>Here is your latest report.</p>
      <div className="user_statistics">
        <div className="statistic" id="height">
          <h1>Height</h1>
          <div>
            <div>
              <p>{user[0].height}</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faCaretUp} />
              <p>
                0.12 <span>%</span>
              </p>
            </div>
          </div>
        </div>
        <div className="statistic" id="weight">
          <h1>Weight</h1>
          <div>
            <div>
              <p>{user[0].weight}</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faCaretDown} />
              <p>
                25 <span>%</span>
              </p>
            </div>
          </div>
        </div>
        <div className="statistic" id="bmindex">
          <h1>BMI Index</h1>
          <div>
            <div>
              <p>21</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faCaretUp} />
              <p>
                23.5 <span>%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="advisor_graph_separator">
        <div className="advisor">
          <h1>Advice</h1>
          <form className="advice_list" onSubmit={(e) => e.preventDefault()}>
            <div>
              <input type="checkbox" name="advice-1" id="advice-1" />
              <label htmlFor="advice-1">Add new advice here!</label>
            </div>
            <button type="submit"></button>
          </form>
        </div>
        <div className="graph">
          <h1>Index Growth</h1>
          <Graph />
        </div>
      </div>
    </>
  )
}
