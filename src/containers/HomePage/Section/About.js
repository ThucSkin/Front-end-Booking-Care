import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {


    render() {

        return (
            <div className="section-share section-about">
                <div className="section-container">
                    <div className="section-header">
                        <span>Truyền thông nói về Thức Skin</span>
                    </div>
                    <div className="section-body">
                        <div className="section-left">
                            <iframe width="50%" height="330px" src="https://www.youtube.com/embed/9PJy_2lt59w" title="Demo Website thiết bị điện tử (Java Spring Boot/themleaf)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
