import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

const Transition = props => <Slide direction="left" {...props} />;

// redux actions
import { closeModal } from "../Actions/modal";

class MainDialog extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        const { modalOpen, modalTitle, modalText } = this.props;

        let fixedModalText = <DialogContentText>{modalText}</DialogContentText>;
        if (modalText) {
            // if multiline, user multiple typographies to show the newlines
            const splitTexts = modalText.split("\n");
            fixedModalText = splitTexts.map(splitText => <Typography variant="body1">{splitText}</Typography>);
        }

        return (
            <Dialog open={modalOpen} TransitionComponent={Transition} onClose={this.props.closeModal}>
                <DialogTitle>{modalTitle}</DialogTitle>
                <DialogContent>{fixedModalText}</DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={this.props.closeModal} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = store => {
    return {
        modalText: store.modal.message,
        modalTitle: store.modal.title,
        modalOpen: store.modal.modalOpen
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainDialog);
