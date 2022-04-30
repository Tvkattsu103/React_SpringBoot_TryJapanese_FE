import React, { useState } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

function NavbarComp() {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen);
    }
    return (
        <>
            <div id="menu">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <Navbar light expand="md">
                            <NavbarBrand href="/">TryJapanese</NavbarBrand>
                            <NavbarToggler onClick={toggle} />
                            <Collapse isOpen={isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink href="/components/">Từ vựng</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            Options
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                Option 1
                                            </DropdownItem>
                                            <DropdownItem>
                                                Option 2
                                            </DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem>
                                                Reset
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                            </Collapse>
                        </Navbar>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavbarComp