import { animate, style, transition, trigger ,AnimationTriggerMetadata} from '@angular/animations'
import {  } from '@angular/core'

export const fadeInOut:AnimationTriggerMetadata  = trigger('fadeInOut', [
  transition(':enter', [
    style({opacity: 0}),
    animate(250 )
  ]),
  transition('* => void', [
    animate(250, style({
      opacity: 0,
    }))
  ])
])

export const fadeIn:AnimationTriggerMetadata = trigger('fadeIn', [
  transition(':enter', [
    style({opacity: 0}),
    animate(500 )
  ]),
  transition(':leave', [
    style({opacity: 0}),
    animate(1 )
  ]),
])

