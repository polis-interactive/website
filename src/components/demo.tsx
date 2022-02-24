import * as React from 'react'

function Demo() {

    const interval =  350

    const [ellipsisCount, setEllipsisCount] = React.useState(0)
    const [, setTimerId] = React.useState(-1)

    const incrementEllipsisCount = () => {
        setEllipsisCount((count) => (count + 1) % 4 )
    }

    const resetEllipsisCount = () => {
        setEllipsisCount(() => 0)
    }

    const startEllipsisTimer = () => {
        setTimerId(window.setInterval(incrementEllipsisCount, interval))
    }

    const stopEllipsisTimer = () => {
        setTimerId((current) => {
            if (current !== -1) {
                window.clearInterval(current)
            }
            return -1
        })
        resetEllipsisCount();
    }

    React.useEffect(() => {
        startEllipsisTimer()
        return () => { stopEllipsisTimer() }
    }, [])

    const displayText = `LOADING${'.'.repeat(ellipsisCount)}`

    return <div>{ displayText }</div>
}

export default Demo
