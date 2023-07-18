import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import ManageSchelude from '../containers/System/Doctor/ManageSchedule';

class Doctor extends Component {
    render() {
        const { DoctorMenuPath, isLoggedIn } = this.props;
        return (
            <>
                {isLoggedIn && <Header />}
                <div className="Doctor-container">
                    <div className="Doctor-list">
                        <Switch>
                            <Route path="/doctor/manage-schedule" component={ManageSchelude} />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);