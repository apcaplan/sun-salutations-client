import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import MobileStepper from '@material-ui/core/MobileStepper'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import Grid from '@material-ui/core/Grid'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const adhoMukhaShvanasana = require('../img/adho mukha shvanasana.jpeg')
const anjaneyasana = require('../img/anjaneyasana.jpeg')
const anuvittasana = require('../img/anuvittasana.jpeg')
const ashtangaNamaskarasana = require('../img/ashtanga namaskarasana.jpeg')
const bhujangasana = require('../img/bhujangasana.jpeg')
const pranamasana = require('../img/pranamasana.jpeg')
const uttanasana = require('../img/uttanasana.jpeg')

const tutorialSteps = [
  {
    label: 'Pranamasana',
    imgPath: pranamasana
  },
  {
    label: 'Anuvittasana',
    imgPath: anuvittasana
  },
  {
    label: 'Uttanasana',
    imgPath: uttanasana
  },
  {
    label: 'Anjaneyasana',
    imgPath: anjaneyasana
  },
  {
    label: 'Adho mukha shvanasana',
    imgPath: adhoMukhaShvanasana
  },
  {
    label: 'Ashtanga namaskarasana',
    imgPath: ashtangaNamaskarasana
  },
  {
    label: 'bhujangasana',
    imgPath: bhujangasana
  },
  {
    label: 'Adho mukha shvanasana',
    imgPath: adhoMukhaShvanasana
  },
  {
    label: 'Anjaneyasana',
    imgPath: anjaneyasana
  },
  {
    label: 'Uttanasana',
    imgPath: uttanasana
  },
  {
    label: 'Anuvittasana',
    imgPath: anuvittasana
  },
  {
    label: 'Pranamasana',
    imgPath: pranamasana
  }
]

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%'
  }
}))

function SuryaNamaskar () {
  const classes = useStyles()
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = tutorialSteps.length

  function handleNext () {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  function handleBack () {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  function handleStepChange (step) {
    setActiveStep(step)
  }

  return (
    <Grid container justify = "center">
      <div className={classes.root}>
        <Paper square elevation={0} className={classes.header}>
          <Typography>{tutorialSteps[activeStep].label}</Typography>
        </Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {tutorialSteps.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <img className={classes.img} src={step.imgPath} alt={step.label} />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="text"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </div>
      <h2>Rounds completed:</h2>
    </Grid>
  )
}

export default SuryaNamaskar
