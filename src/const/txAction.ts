export default {
    Vote: {
        isReceiver: false,
        action: 'cosmos.gov.v1beta1.MsgVote', // 投票
    },
    Delegate: {
        isReceiver: false,
        action: 'cosmos.staking.v1beta1.MsgDelegate', // 质押
    },
    Undelegate: {
        isReceiver: false,
        action: 'cosmos.staking.v1beta1.MsgUndelegate', // 解除质押
    },
    BeginRedelegate: {
        isReceiver: false,
        action: 'cosmos.staking.v1beta1.MsgBeginRedelegate', // 开始重新质押
    },
    Send: {
        isReceiver: false,
        action: 'cosmos.bank.v1beta1.MsgSend', // 发送
    },
    Receive: {
        isReceiver: true,
        action: 'cosmos.bank.v1beta1.MsgSend', // 接收
    },
    IBCTransfer: {
        isReceiver: false,
        action: 'ibc.applications.transfer.v1.MsgTransfer',
    },
    IBCReceived: {
        isReceiver: false,
        action: 'ibc.core.channel.v1.MsgRecvPacket',
    },
    MultiSend: {
        isReceiver: true,
        action: 'cosmos.bank.v1beta1.MsgMultiSend',
    },
    GetReward: {
        isReceiver: false,
        action: 'cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
    },
}
