import React, { Component } from 'react'
import './styles.css'
import '../../assest/font-awesome/css/font-awesome.min.css'

class VoteScore extends Component {

    static defaultProps = {
        classNames: []
    }

    render () {
        const { score, onUpScore, onDownScore, classNames } = this.props
        const classRaw = classNames.join(' ')
        return (
            <section className={`voteScore ${classRaw}`}>
                <p>Vote { score }</p>
                <section className='voteScore-section-buttons'>
                    <button
                        className='voteScore-button voteScore-up'
                        onClick={onUpScore}
                    >
                        <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                    </button>
                    <button
                        onClick={onDownScore}
                        className='voteScore-button voteScore-down'
                    >
                        <i className="fa fa-thumbs-down" aria-hidden="true"></i>
                    </button>
                </section>
            </section>
        )
    }
}

export default VoteScore