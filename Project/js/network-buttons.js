import {Component, Type} from '@wonderlandengine/api';

export class NetworkButtons extends Component {
    static TypeName = 'network-buttons';
    static Properties = {
        peerManagerObject: {type: Type.Object},
        cursor: {type: Type.Object},
        hostButton: {type: Type.Object},
        joinButton: {type: Type.Object},
    };

    start() {
        this.pm = this.peerManagerObject.getComponent('peer-manager');

        /* If hostButton or joinButton are not specified, we search
         * for them by name */
        for (let c of this.object.children) {
            if (c.name == 'HostButton') this.hostButton = this.hostButton || c;
            if (c.name == 'JoinButton') this.joinButton = this.joinButton || c;
        }

        this.hostButtonCollider = this.hostButton.getComponent('collision');
        this.hostButton
            .getComponent('cursor-target')
            .addClickFunction(this.pm.host.bind(this.pm));

        this.joinButtonCollider = this.joinButton.getComponent('collision');
        this.joinButton
            .getComponent('cursor-target')
            .addClickFunction(this.pm.join.bind(this.pm));

        this.pm.addConnectionEstablishedCallback(this.hide.bind(this));
        this.pm.addDisconnectCallback(this.show.bind(this));
    }

    show() {
        if (this.cursor.getComponent('cursor').setEnabled)
            this.cursor.getComponent('cursor').setEnabled(true);
        this.hostButtonCollider.active = true;
        this.joinButtonCollider.active = true;
        this.object.setTranslationLocal([0, 0, -3]);
    }

    hide() {
        /* Old versions of the cursor component don't have the setEnabled function */
        if (this.cursor.getComponent('cursor').setEnabled)
            this.cursor.getComponent('cursor').setEnabled(false);
        this.hostButtonCollider.active = false;
        this.joinButtonCollider.active = false;
        this.object.setTranslationLocal([0, -300, 0]);
    }
}
