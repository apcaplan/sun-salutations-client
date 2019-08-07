import React from 'react'

import Grid from '@material-ui/core/Grid'

const Welcome = () => (
  <React.Fragment>
    <div className="welcome-main">
      <div className="welcome">
        <Grid container direction="column" alignItems="center" spacing={1}>
          <Grid direction="column" alignItems="center" item>
            <div className="welcome-content">
              <h1 className="welcome-greeting">
                Namaste, yogi!
              </h1>
              <p>This app will help you to count rounds of sun salutations as you practice, and to track your progress over time.</p>
              <p>Click the sign up tab above and fill out the form to create a new login.
                You will be signed in automatically. </p>
              <p>If you already have a login, welcome back! Click the sign in tab, and fill out the form to begin.</p>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  </React.Fragment>
)

export default Welcome
