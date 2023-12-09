import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Peer } from "@libp2p/interface-peer-store";
import type { IFilter, ILightPush, IStore } from "@waku/interfaces";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function handleCatch(
  promise?: Promise<Peer[]>
): Promise<Peer[] | undefined> {
  if (!promise) {
    return Promise.resolve(undefined);
  }

  try {
    return await promise;
  } catch (_) {
    return undefined;
  }
}

export function getPeerIdsForProtocol(
  protocol: IStore | ILightPush | IFilter | undefined,
  peers: Peer[]
) {
  return protocol
    ? peers
        .filter((p) => p.protocols.includes(protocol.multicodec))
        .map((p) => p.id)
    : [];
}
