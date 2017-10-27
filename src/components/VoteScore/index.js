import React, { Component } from 'react'
import './styles.css'
import '../../assest/font-awesome/css/font-awesome.min.css'


/**
*
* component that renders a score, voteUp button and voteDown button
*
* @prop score(int): number of votes of component parent
* @prop onUpScore(func): callback function that is called when voteUp click event is active
* @prop onDownScore(func): callback function that is called when voteDown click event is active
* @prop classNames(array): classnames(string) list
*
* */

class VoteScore extends Component {

    static defaultProps = {
        classNames: []
    }

    render () {
        const { score, onUpScore, onDownScore, classNames } = this.props
        const classRaw = classNames.join(' ')
        return (
            <section className={`voteScore ${classRaw}`}>
                <p
                    className={'voteScore-section'}
                ><strong>Score</strong> { score }</p>
                <section
                    className='voteScore-section voteScore-section-buttons'>
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