import React from "react";
import { connect } from "react-redux";
import Badge from "@material-ui/core/Badge";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";

import SyncIcon from "@material-ui/icons/Sync";

import { queueStartSync } from "../../Actions/queue";

const styles = {};

class QueueHeaderIcon extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            queueRequestCounter: 0
        };

        this.updateDelay = null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        // throttle updates by 250ms to gather up rapid redux events
        if (nextProps.queueRequestCounter !== this.state.queueRequestCounter) {
            if (this.updateDelay) clearTimeout(this.updateDelay);
            this.updateDelay = setTimeout(this.setQueueRequestCounter, 250);
        }

        if (nextProps.queueLoading !== this.props.queueLoading) return true;
        if (nextState.queueRequestCounter !== this.state.queueRequestCounter) {
            return true;
        }

        return false;
    }

    setQueueRequestCounter = () => {
        this.setState({
            queueRequestCounter: this.props.queueRequestCounter
        });
    };

    render() {
        const { queueLoading, queueTriggerSync } = this.props;
        const { queueRequestCounter } = this.state;

        return (
            <IconButton
                style={this.props.style}
                disabled={queueLoading || queueTriggerSync}
                onClick={this.props.queueStartSync}
            >
                {queueLoading ? (
                    <Badge badgeContent={queueRequestCounter} color="primary">
                        <CircularProgress size={20} />
                    </Badge>
                ) : (
                    <SyncIcon />
                )}
            </IconButton>
        );
    }
}

const mapStateToProps = state => {
    return {
        queueRequestCounter: state.queue.request_counter,
        queueTriggerSync: state.queue.trigger_sync,
        queueLoading: state.queue.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        queueStartSync: () => dispatch(queueStartSync())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QueueHeaderIcon);
