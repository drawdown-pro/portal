import Link from 'next/link'
import LoginStatus from './LoginStatus'
import { Box, Grid, Heading, Menu, Grommet } from 'grommet';
import { CaretDown, More } from 'grommet-icons';

const linkStyle = {
  marginRight: 15
}


class DrawdownHeader extends React.Component {

  static loginClick(event) {
    event.preventDefault();
    LoginStatus.login();
  }

  constructor(props) {
    super(props)
  }

    // {/* move to HEAD */}
    // <meta name="viewport" content="width=device-width, initial-scale=1"/>

  render(props) {
    return <Grid
      rows={['small']}
      columns={['1/2', '1/2']}
      areas={[
        { name: 'left',  start: [0, 0], end: [0, 0] },
        { name: 'right', start: [1, 0], end: [1, 0] },
      ]}
      gap='none'
      >

      <Box
        align='stretch'
        justify='start'
        gridArea='left'
      >

        <Heading>
          DrawdownPRO
        </Heading>
      </Box>
      <Box
        align='end'
        justify='center'
        gridArea='right'
      >
        <LoginStatus style={linkStyle} />
      </Box>
    </Grid>
  }

}

export default DrawdownHeader
