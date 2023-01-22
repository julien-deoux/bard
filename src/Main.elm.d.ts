interface Ports {
  transportAction: PortFromElm<'play' | 'pause' | 'stop'>
  electronAction: PortFromElm
  sectionAction: PortFromElm<string>
  sectionsReceiver: PortToElm<string[]>
}

export const Elm: ElmInstance<Ports>
