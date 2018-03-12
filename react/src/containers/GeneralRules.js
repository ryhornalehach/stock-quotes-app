import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GeneralRules extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {

    return(
      <div>
        <div className="row">
          <div className="col s12">
            <h4>General rules and procedures</h4>
            <ol>
              <li>When you get to clients house:
                <ul>
                  <li>- Call</li>
                  <li>- Ring the bell, knock the door</li>
                </ul>
              </li>
              <li>When you get to the facility:
                <ul>
                  <li>- Call the client</li>
                  <li>- Check inside the lobby</li>
                  <li>- Ask the receptionist</li>
                </ul>
              </li>
              <li>When you dropped off the client, always report that to the dispatcher. If you don`t know what  the  next client will be- ask the dispatcher. Stay in the area where you drop off the last client, don't go anywhere until the dispatcher tells you  to leave. If you know your next clients - proceed to the next clients.</li>
              <li>Make sure you have enough gas for the day! If you can not do your job due to the fact that you don’t have enough gas, it will be considered as a failure to work. </li>
              <li>Never go to the gas station with the client in the car!!! </li>
              <li>If you haven`t receive the schedule for next day by 09:30PM - it doesn't mean that you have a day off - it means that something went wrong - either the schedule went to SPAM box, or somehow it wasn't delivered to you. In that case immediately inform us that you haven`t received the schedule. Inform the dispatcher, or try to contact Andrew or Vladimir.</li>
              <li>If you don't see your name in the schedule for the morning - it doesn't mean that you have a day off, it's just you are off for the morning. Don`t say that you can`t work for the rest of the day without notice. If you want the rest of the day off - ask dispatcher if it`s possible. Otherwise it will be considered as a no show.</li>
              <li>If you are getting late for your client - inform the dispatcher, we need to be aware of any delays.</li>
              <li>If you are late for your first morning pickup - let us know, we need to be aware of any delays. We will find it out later anyway and it will be a warning  for you if you didn`t report.</li>
              <li>When dispatcher sends you the next clients - always confirm that you've received them. Sometimes our messaging system gets screwed up and the message might not be delivered, so always confirm the new clients.</li>
              <li>If you are not getting response from dispatcher within 5-10 minutes - ask again or give us a call, maybe the message didn't go through Don't just sit there for hours doing nothing, it will be considered as a break.</li>
              <li>Report all cancellations/ no shows  right away!</li>
              <li>Report procedure: report all clients’ pickups and drop offs : as soon as you picked up the client - text : “#xxx picked up” , as soon as you dropped off the client - text : “#xxx dropped off”. In this case we will have an idea of where are you now, and we don't need to text you or call asking how far you are</li>
              <li>Picking the clients up from unauthorized address is not allowed. If the client is not at the scheduled address - report immediately to the dispatcher! </li>
              <li>Always pay attention for the schedule, don't confuse client numbers.</li>
              <li>If clients going together - they have to go together, don't drive them separately.</li>
              <li>If clients going together - always follow assigned pickup order, don`t change the pickup order because you thought it would  be better or because other client were closer to you. If you think of other pickup order - ask the dispatcher first</li>
              <li>If you got to the client`s address earlier - you can call the client and politely ask if he/she can come earlier, don't force them.</li>
              <li>If you need a day-off or a break during the day - make sure you inform the dispatcher at least 2-3 days in advance. Otherwise - we can’t guarantee the day off.</li>
              <li>When you switch the cars - make sure that new car has all the needed safety equipment and business cards.</li>
              <li>Make sure you always have enough business cards of all companies. If you are missing something or running out of anything - let know the dispatcher.</li>
              <li>Make sure your GPS or phone is charged and you have a charger with you in order you can perform your job.</li>
              <li>If you are moving  to a new address - please, inform us, because  we calculate travel compensation for you according to your resident address.</li>
              <li>Please follow your car oil change cycles. If it's getting close to 500 miles due to  next oil change - tell the dispatcher.</li>
              <li>If you bought something for the car (e.g. wipers, oil, etc.) - make sure you have a receipt, so you'll be reimbursed correctly.</li>
              <li>Report ANY accidents or any damages on a car immediately! and make a picture of the other party’s driving license and plate numbers and registration.</li>
              <li>You can use our EZ-Pass only during work time. Any toll roads taken at you off-time has to be paid by driver using cash lane. Make sure you've removed the transponder while going through cash lanes.</li>
              <li>If you resign from the company - give us a 2 weeks notice.</li>
              <li>You have to be available on-call 30 minutes before your first client and after last drop off.</li>
              <li>In case  you need an advance - inform us 2 days before.</li>
              <li>Do not eat or drink when you are with the client.</li>
              <li>Smoking is prohibited in the car!</li>
              <li>If you need a short break (to take a bathroom, etc.) - inform the dispatcher.</li>
              <li>Clients are not allowed to leave any personal belongings in the car, even if they are going outside of the car for 1 minute.</li>
              <li>For every positive feedback from the clients that they made officially through MART, driver will receive $25 bonus.</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default GeneralRules
