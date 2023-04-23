
import React, { useEffect, useState, useRef } from "react";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useLogin } from "../components/LoginContext";
import { Box, Button } from "@mui/material";



export default function Chat({ selectedPatient }) {
    const { userAfterLogin } = useLogin();

    const [calleeId, setCalleeId] = useState(selectedPatient?.email);
    const zeroCloudInstance = useRef(null);

    async function init() {
        const userId = userAfterLogin[0]?.email;
        const userName = userAfterLogin[0]?.name;



        const appID = 2007451686;
        const serverSecret = "0a021b5abf734c3486c0c64dc5d31288";

        const KitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            null,
            userId,
            userName
        );

        zeroCloudInstance.current = ZegoUIKitPrebuilt.create(KitToken);
        // add plugin
        zeroCloudInstance.current.addPlugins({ ZIM });
    }


    function handleSend(callType) {
        const callee = calleeId;
        if (!callee) {
            alert("userID cannot be empty!!");
            return;
        }

        // send call invitation
        zeroCloudInstance.current
            .sendCallInvitation({
                callees: [{ userID: callee, userName: callee }],
                callType: callType,
                timeout: 60
            })
            .then((res) => {
                // console.warn(res);
                if (res.errorInvitees.length) {
                    alert("The user dose not exist or is offline.");
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10%', columnGap: '15px' }}>
            <input
                type="hidden"
                is="userId"
                placeholder="callee's userID"
                value={calleeId}
                onChange={(event) => {
                    setCalleeId(event.target.value);
                }}
            />
            <Button
                variant="outlined"
                sx={{ paddingX: '80px' }}
                onClick={() => {
                    handleSend(ZegoUIKitPrebuilt.InvitationTypeVideoCall);
                }}
            >
                Video call
            </Button>
            <Button
                variant="outlined"
                sx={{ paddingX: '80px' }}
                onClick={() => {
                    handleSend(ZegoUIKitPrebuilt.InvitationTypeVoiceCall);
                }}
            >
                Voice call
            </Button>
        </Box>
    );
}
