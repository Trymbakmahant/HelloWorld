import { useRemoteVideo } from "@huddle01/react/hooks";
import { stat } from "fs";
import { useEffect, useRef } from "react";
type Props ={
    peerId: string
}


const AcceptPeer=({peerId} :Props)=>{
    const {stream, state} = useRemoteVideo({peerId});
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(()=>{
        if(stream&& videoRef.current && state === 'playable'){
            videoRef.current.srcObject = stream;
            videoRef.current?.play();
        }
    },[stream,state]);
    return(
        <div>
            <video
            ref={videoRef}
            autoPlay
            muted
            className="border-2 rounded-xl border-white-400 aspect-video"/>
        </div>
    )
}
export default AcceptPeer;