export default {
    Vote: 'cosmos.gov.v1beta1.MsgVote', // 投票
    Delegate: 'cosmos.staking.v1beta1.MsgDelegate', // 质押
    BeginRedelegate: 'cosmos.staking.v1beta1.MsgBeginRedelegate', // 解除质押
    Send: 'cosmos.bank.v1beta1.MsgSend', // 发送
    Receive: 'cosmos.bank.v1beta1.MsgSend', // 接收
    IBCTransfer: 'ibc.applications.transfer.v1.MsgTransfer',
    IBCReceived: 'ibc.core.channel.v1.MsgRecvPacket',
    MultiSend: 'cosmos.bank.v1beta1.MsgMultiSend',
    GetReward: 'cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
}
