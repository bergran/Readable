import React, { Component } from 'react'

class NavBarSection extends Component {
    render () {
        const { title, onClick, subSections } = this.props
        return (
            <section className='nav-bar-section' onClick={onClick}>
                <h1>{ title }</h1>
                {
                    subSections &&
                    <section>
                        hello world subsection
                        {/* only will show it if this section has subsections */}
                    </section>
                }
            </section>
        )
    }
}