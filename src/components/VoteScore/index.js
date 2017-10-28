import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'
import '../../assest/font-awesome/css/font-awesome.min.css'


/**
*
* component that renders a score, voteUp button and voteDown button
*
* @param score(int): number of votes of component parent
* @param onUpScore(func): callback function that is called when voteUp click event is active
* @param onDownScore(func): callback function that is called when voteDown click event is active
* @param classNames(array): classnames(string) list
*
* */

class VoteScore extends Component {

    static propTypes = {
        score: PropTypes.number.isRequired,
        onUpScore: PropTypes.func.isRequired,
        onDownScore: PropTypes.func.isRequired,
        classNames: PropTypes.array
    }

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