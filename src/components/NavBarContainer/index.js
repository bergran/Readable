import React, { Component } from 'react'
import NavBarSection from '../NavBarSection'

class NavBarContainer extends Component {
    render () {
        const { title, path, sections } = this.props
        return (
            <section>
                <NavBarSection
                    title={title}
                    path={path}
                />
                {
                    sections &&
                    <ul>
                        {
                            sections.map((section, index)=> <NavBarSection key={index} {...section} />)
                        }
                    </ul>
                }
            </section>
        )
    }
}