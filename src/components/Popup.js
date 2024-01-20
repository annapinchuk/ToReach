import React from 'react';

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        showPopup: false,
        };
    }
    
    togglePopup() {
        this.setState({
        showPopup: !this.state.showPopup,
        });
    }
    
    render() {
        return (
        <div>
            <button onClick={this.togglePopup.bind(this)}>Click To Launch Popup</button>
    
            {this.state.showPopup ? (
            <Popup
                text='Click "Close Button" to hide popup'
                closePopup={this.togglePopup.bind(this)}
            />
            ) : null}
        </div>
        );
    }
}

export default Popup; // Add this line to export the component

