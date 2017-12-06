import Header from '../components/Header'
import Footer from '../components/Footer'
import Auth from '../lib/AuthService.js'

const CONTAINER_ID = 'drawdown-lock'

class Login extends React.Component {
  componentDidMount () {
    var auth = new Auth()
    auth.show(CONTAINER_ID)
  }

  render () {
    return <div id={CONTAINER_ID} />
  }
}

export default () => (
  <div>
    <Header />
    <h2>login</h2>
    <Login />

    <Footer />
  </div>
)
