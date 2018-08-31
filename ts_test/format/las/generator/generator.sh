#!/bin/bash

# too many lines of code!

mkdir lasdump

#########################################
#########################################
############ Minor Version 1 ############
#########################################
#########################################

####################
# data format id 0 #
####################

pdal pipeline generator.json --writers.las.minor_version=1 \
    --writers.las.dataformat_id=0

pdal pipeline classify.json --writers.las.filename=lasdump/tmp1.las \
    --readers.las.filename=lasdump/tmp1.las \
    --filters.assign.assignment=Classification[0:0]=0

pdal pipeline classify.json --writers.las.filename=lasdump/tmp2.las \
    --readers.las.filename=lasdump/tmp2.las \
    --filters.assign.assignment=Classification[0:0]=1

pdal pipeline classify.json --writers.las.filename=lasdump/tmp3.las \
    --readers.las.filename=lasdump/tmp3.las \
    --filters.assign.assignment=Classification[0:0]=2

pdal pipeline classify.json --writers.las.filename=lasdump/tmp4.las \
    --readers.las.filename=lasdump/tmp4.las \
    --filters.assign.assignment=Classification[0:0]=3

pdal pipeline classify.json --writers.las.filename=lasdump/tmp5.las \
    --readers.las.filename=lasdump/tmp5.las \
    --filters.assign.assignment=Classification[0:0]=4

pdal pipeline classify.json --writers.las.filename=lasdump/tmp6.las \
    --readers.las.filename=lasdump/tmp6.las \
    --filters.assign.assignment=Classification[0:0]=5

pdal pipeline classify.json --writers.las.filename=lasdump/tmp7.las \
    --readers.las.filename=lasdump/tmp7.las \
    --filters.assign.assignment=Classification[0:0]=6

pdal pipeline classify.json --writers.las.filename=lasdump/tmp8.las \
    --readers.las.filename=lasdump/tmp8.las \
    --filters.assign.assignment=Classification[0:0]=7

pdal pipeline classify.json --writers.las.filename=lasdump/tmp9.las \
    --readers.las.filename=lasdump/tmp9.las \
    --filters.assign.assignment=Classification[0:0]=8

pdal pipeline classify.json --writers.las.filename=lasdump/tmp10.las \
    --readers.las.filename=lasdump/tmp10.las \
    --filters.assign.assignment=Classification[0:0]=9

pdal pipeline merge.json --writers.las.filename=v1d0.las

####################
# data format id 1 #
####################

# generate 10 files of random points
pdal pipeline generator.json --writers.las.minor_version=1 \
    --writers.las.dataformat_id=1

# using placeholder classify script and repeat
pdal pipeline classify.json --writers.las.filename=lasdump/tmp1.las \
    --readers.las.filename=lasdump/tmp1.las \
    --filters.assign.assignment=Classification[0:0]=0

pdal pipeline classify.json --writers.las.filename=lasdump/tmp2.las \
    --readers.las.filename=lasdump/tmp2.las \
    --filters.assign.assignment=Classification[0:0]=1

pdal pipeline classify.json --writers.las.filename=lasdump/tmp3.las \
    --readers.las.filename=lasdump/tmp3.las \
    --filters.assign.assignment=Classification[0:0]=2

pdal pipeline classify.json --writers.las.filename=lasdump/tmp4.las \
    --readers.las.filename=lasdump/tmp4.las \
    --filters.assign.assignment=Classification[0:0]=3

pdal pipeline classify.json --writers.las.filename=lasdump/tmp5.las \
    --readers.las.filename=lasdump/tmp5.las \
    --filters.assign.assignment=Classification[0:0]=4

pdal pipeline classify.json --writers.las.filename=lasdump/tmp6.las \
    --readers.las.filename=lasdump/tmp6.las \
    --filters.assign.assignment=Classification[0:0]=5

pdal pipeline classify.json --writers.las.filename=lasdump/tmp7.las \
    --readers.las.filename=lasdump/tmp7.las \
    --filters.assign.assignment=Classification[0:0]=6

pdal pipeline classify.json --writers.las.filename=lasdump/tmp8.las \
    --readers.las.filename=lasdump/tmp8.las \
    --filters.assign.assignment=Classification[0:0]=7

pdal pipeline classify.json --writers.las.filename=lasdump/tmp9.las \
    --readers.las.filename=lasdump/tmp9.las \
    --filters.assign.assignment=Classification[0:0]=8

pdal pipeline classify.json --writers.las.filename=lasdump/tmp10.las \
    --readers.las.filename=lasdump/tmp10.las \
    --filters.assign.assignment=Classification[0:0]=9

# merge all class groups together
pdal pipeline merge.json --writers.las.filename=v1d1.las

####################
# data format id 2 #
####################

pdal pipeline generator.json --writers.las.minor_version=1 \
    --writers.las.dataformat_id=2

pdal pipeline classify.json --writers.las.filename=lasdump/tmp1.las \
    --readers.las.filename=lasdump/tmp1.las \
    --filters.assign.assignment=Classification[0:0]=0

pdal pipeline classify.json --writers.las.filename=lasdump/tmp2.las \
    --readers.las.filename=lasdump/tmp2.las \
    --filters.assign.assignment=Classification[0:0]=1

pdal pipeline classify.json --writers.las.filename=lasdump/tmp3.las \
    --readers.las.filename=lasdump/tmp3.las \
    --filters.assign.assignment=Classification[0:0]=2

pdal pipeline classify.json --writers.las.filename=lasdump/tmp4.las \
    --readers.las.filename=lasdump/tmp4.las \
    --filters.assign.assignment=Classification[0:0]=3

pdal pipeline classify.json --writers.las.filename=lasdump/tmp5.las \
    --readers.las.filename=lasdump/tmp5.las \
    --filters.assign.assignment=Classification[0:0]=4

pdal pipeline classify.json --writers.las.filename=lasdump/tmp6.las \
    --readers.las.filename=lasdump/tmp6.las \
    --filters.assign.assignment=Classification[0:0]=5

pdal pipeline classify.json --writers.las.filename=lasdump/tmp7.las \
    --readers.las.filename=lasdump/tmp7.las \
    --filters.assign.assignment=Classification[0:0]=6

pdal pipeline classify.json --writers.las.filename=lasdump/tmp8.las \
    --readers.las.filename=lasdump/tmp8.las \
    --filters.assign.assignment=Classification[0:0]=7

pdal pipeline classify.json --writers.las.filename=lasdump/tmp9.las \
    --readers.las.filename=lasdump/tmp9.las \
    --filters.assign.assignment=Classification[0:0]=8

pdal pipeline classify.json --writers.las.filename=lasdump/tmp10.las \
    --readers.las.filename=lasdump/tmp10.las \
    --filters.assign.assignment=Classification[0:0]=9

pdal pipeline merge.json --writers.las.filename=v1d2.las

####################
# data format id 3 #
####################

pdal pipeline generator.json --writers.las.minor_version=1 \
    --writers.las.dataformat_id=3

pdal pipeline classify.json --writers.las.filename=lasdump/tmp1.las \
    --readers.las.filename=lasdump/tmp1.las \
    --filters.assign.assignment=Classification[0:0]=0

pdal pipeline classify.json --writers.las.filename=lasdump/tmp2.las \
    --readers.las.filename=lasdump/tmp2.las \
    --filters.assign.assignment=Classification[0:0]=1

pdal pipeline classify.json --writers.las.filename=lasdump/tmp3.las \
    --readers.las.filename=lasdump/tmp3.las \
    --filters.assign.assignment=Classification[0:0]=2

pdal pipeline classify.json --writers.las.filename=lasdump/tmp4.las \
    --readers.las.filename=lasdump/tmp4.las \
    --filters.assign.assignment=Classification[0:0]=3

pdal pipeline classify.json --writers.las.filename=lasdump/tmp5.las \
    --readers.las.filename=lasdump/tmp5.las \
    --filters.assign.assignment=Classification[0:0]=4

pdal pipeline classify.json --writers.las.filename=lasdump/tmp6.las \
    --readers.las.filename=lasdump/tmp6.las \
    --filters.assign.assignment=Classification[0:0]=5

pdal pipeline classify.json --writers.las.filename=lasdump/tmp7.las \
    --readers.las.filename=lasdump/tmp7.las \
    --filters.assign.assignment=Classification[0:0]=6

pdal pipeline classify.json --writers.las.filename=lasdump/tmp8.las \
    --readers.las.filename=lasdump/tmp8.las \
    --filters.assign.assignment=Classification[0:0]=7

pdal pipeline classify.json --writers.las.filename=lasdump/tmp9.las \
    --readers.las.filename=lasdump/tmp9.las \
    --filters.assign.assignment=Classification[0:0]=8

pdal pipeline classify.json --writers.las.filename=lasdump/tmp10.las \
    --readers.las.filename=lasdump/tmp10.las \
    --filters.assign.assignment=Classification[0:0]=9

pdal pipeline merge.json --writers.las.filename=v1d3.las


#########################################
#########################################
############ Minor Version 2 ############
#########################################
#########################################

####################
# data format id 0 #
####################

pdal pipeline generator.json --writers.las.minor_version=1 \
    --writers.las.dataformat_id=0

pdal pipeline classify.json --writers.las.filename=lasdump/tmp1.las \
    --readers.las.filename=lasdump/tmp1.las \
    --filters.assign.assignment=Classification[0:0]=0

pdal pipeline classify.json --writers.las.filename=lasdump/tmp2.las \
    --readers.las.filename=lasdump/tmp2.las \
    --filters.assign.assignment=Classification[0:0]=1

pdal pipeline classify.json --writers.las.filename=lasdump/tmp3.las \
    --readers.las.filename=lasdump/tmp3.las \
    --filters.assign.assignment=Classification[0:0]=2

pdal pipeline classify.json --writers.las.filename=lasdump/tmp4.las \
    --readers.las.filename=lasdump/tmp4.las \
    --filters.assign.assignment=Classification[0:0]=3

pdal pipeline classify.json --writers.las.filename=lasdump/tmp5.las \
    --readers.las.filename=lasdump/tmp5.las \
    --filters.assign.assignment=Classification[0:0]=4

pdal pipeline classify.json --writers.las.filename=lasdump/tmp6.las \
    --readers.las.filename=lasdump/tmp6.las \
    --filters.assign.assignment=Classification[0:0]=5

pdal pipeline classify.json --writers.las.filename=lasdump/tmp7.las \
    --readers.las.filename=lasdump/tmp7.las \
    --filters.assign.assignment=Classification[0:0]=6

pdal pipeline classify.json --writers.las.filename=lasdump/tmp8.las \
    --readers.las.filename=lasdump/tmp8.las \
    --filters.assign.assignment=Classification[0:0]=7

pdal pipeline classify.json --writers.las.filename=lasdump/tmp9.las \
    --readers.las.filename=lasdump/tmp9.las \
    --filters.assign.assignment=Classification[0:0]=8

pdal pipeline classify.json --writers.las.filename=lasdump/tmp10.las \
    --readers.las.filename=lasdump/tmp10.las \
    --filters.assign.assignment=Classification[0:0]=9

pdal pipeline merge.json --writers.las.filename=v1d0.las

####################
# data format id 1 #
####################

# generate 10 files of random points
pdal pipeline generator.json --writers.las.minor_version=1 \
    --writers.las.dataformat_id=1

# using placeholder classify script and repeat
pdal pipeline classify.json --writers.las.filename=lasdump/tmp1.las \
    --readers.las.filename=lasdump/tmp1.las \
    --filters.assign.assignment=Classification[0:0]=0

pdal pipeline classify.json --writers.las.filename=lasdump/tmp2.las \
    --readers.las.filename=lasdump/tmp2.las \
    --filters.assign.assignment=Classification[0:0]=1

pdal pipeline classify.json --writers.las.filename=lasdump/tmp3.las \
    --readers.las.filename=lasdump/tmp3.las \
    --filters.assign.assignment=Classification[0:0]=2

pdal pipeline classify.json --writers.las.filename=lasdump/tmp4.las \
    --readers.las.filename=lasdump/tmp4.las \
    --filters.assign.assignment=Classification[0:0]=3

pdal pipeline classify.json --writers.las.filename=lasdump/tmp5.las \
    --readers.las.filename=lasdump/tmp5.las \
    --filters.assign.assignment=Classification[0:0]=4

pdal pipeline classify.json --writers.las.filename=lasdump/tmp6.las \
    --readers.las.filename=lasdump/tmp6.las \
    --filters.assign.assignment=Classification[0:0]=5

pdal pipeline classify.json --writers.las.filename=lasdump/tmp7.las \
    --readers.las.filename=lasdump/tmp7.las \
    --filters.assign.assignment=Classification[0:0]=6

pdal pipeline classify.json --writers.las.filename=lasdump/tmp8.las \
    --readers.las.filename=lasdump/tmp8.las \
    --filters.assign.assignment=Classification[0:0]=7

pdal pipeline classify.json --writers.las.filename=lasdump/tmp9.las \
    --readers.las.filename=lasdump/tmp9.las \
    --filters.assign.assignment=Classification[0:0]=8

pdal pipeline classify.json --writers.las.filename=lasdump/tmp10.las \
    --readers.las.filename=lasdump/tmp10.las \
    --filters.assign.assignment=Classification[0:0]=9

# merge all class groups together
pdal pipeline merge.json --writers.las.filename=v1d1.las

####################
# data format id 2 #
####################

pdal pipeline generator.json --writers.las.minor_version=1 \
    --writers.las.dataformat_id=2

pdal pipeline classify.json --writers.las.filename=lasdump/tmp1.las \
    --readers.las.filename=lasdump/tmp1.las \
    --filters.assign.assignment=Classification[0:0]=0

pdal pipeline classify.json --writers.las.filename=lasdump/tmp2.las \
    --readers.las.filename=lasdump/tmp2.las \
    --filters.assign.assignment=Classification[0:0]=1

pdal pipeline classify.json --writers.las.filename=lasdump/tmp3.las \
    --readers.las.filename=lasdump/tmp3.las \
    --filters.assign.assignment=Classification[0:0]=2

pdal pipeline classify.json --writers.las.filename=lasdump/tmp4.las \
    --readers.las.filename=lasdump/tmp4.las \
    --filters.assign.assignment=Classification[0:0]=3

pdal pipeline classify.json --writers.las.filename=lasdump/tmp5.las \
    --readers.las.filename=lasdump/tmp5.las \
    --filters.assign.assignment=Classification[0:0]=4

pdal pipeline classify.json --writers.las.filename=lasdump/tmp6.las \
    --readers.las.filename=lasdump/tmp6.las \
    --filters.assign.assignment=Classification[0:0]=5

pdal pipeline classify.json --writers.las.filename=lasdump/tmp7.las \
    --readers.las.filename=lasdump/tmp7.las \
    --filters.assign.assignment=Classification[0:0]=6

pdal pipeline classify.json --writers.las.filename=lasdump/tmp8.las \
    --readers.las.filename=lasdump/tmp8.las \
    --filters.assign.assignment=Classification[0:0]=7

pdal pipeline classify.json --writers.las.filename=lasdump/tmp9.las \
    --readers.las.filename=lasdump/tmp9.las \
    --filters.assign.assignment=Classification[0:0]=8

pdal pipeline classify.json --writers.las.filename=lasdump/tmp10.las \
    --readers.las.filename=lasdump/tmp10.las \
    --filters.assign.assignment=Classification[0:0]=9

pdal pipeline merge.json --writers.las.filename=v1d2.las

####################
# data format id 3 #
####################

pdal pipeline generator.json --writers.las.minor_version=1 \
    --writers.las.dataformat_id=3

pdal pipeline classify.json --writers.las.filename=lasdump/tmp1.las \
    --readers.las.filename=lasdump/tmp1.las \
    --filters.assign.assignment=Classification[0:0]=0

pdal pipeline classify.json --writers.las.filename=lasdump/tmp2.las \
    --readers.las.filename=lasdump/tmp2.las \
    --filters.assign.assignment=Classification[0:0]=1

pdal pipeline classify.json --writers.las.filename=lasdump/tmp3.las \
    --readers.las.filename=lasdump/tmp3.las \
    --filters.assign.assignment=Classification[0:0]=2

pdal pipeline classify.json --writers.las.filename=lasdump/tmp4.las \
    --readers.las.filename=lasdump/tmp4.las \
    --filters.assign.assignment=Classification[0:0]=3

pdal pipeline classify.json --writers.las.filename=lasdump/tmp5.las \
    --readers.las.filename=lasdump/tmp5.las \
    --filters.assign.assignment=Classification[0:0]=4

pdal pipeline classify.json --writers.las.filename=lasdump/tmp6.las \
    --readers.las.filename=lasdump/tmp6.las \
    --filters.assign.assignment=Classification[0:0]=5

pdal pipeline classify.json --writers.las.filename=lasdump/tmp7.las \
    --readers.las.filename=lasdump/tmp7.las \
    --filters.assign.assignment=Classification[0:0]=6

pdal pipeline classify.json --writers.las.filename=lasdump/tmp8.las \
    --readers.las.filename=lasdump/tmp8.las \
    --filters.assign.assignment=Classification[0:0]=7

pdal pipeline classify.json --writers.las.filename=lasdump/tmp9.las \
    --readers.las.filename=lasdump/tmp9.las \
    --filters.assign.assignment=Classification[0:0]=8

pdal pipeline classify.json --writers.las.filename=lasdump/tmp10.las \
    --readers.las.filename=lasdump/tmp10.las \
    --filters.assign.assignment=Classification[0:0]=9

pdal pipeline merge.json --writers.las.filename=v1d3.las


#########################################
#########################################
############ Minor Version 3 ############
#########################################
#########################################

####################
# data format id 0 #
####################

pdal pipeline generator.json --writers.las.minor_version=1 \
    --writers.las.dataformat_id=0

pdal pipeline classify.json --writers.las.filename=lasdump/tmp1.las \
    --readers.las.filename=lasdump/tmp1.las \
    --filters.assign.assignment=Classification[0:0]=0

pdal pipeline classify.json --writers.las.filename=lasdump/tmp2.las \
    --readers.las.filename=lasdump/tmp2.las \
    --filters.assign.assignment=Classification[0:0]=1

pdal pipeline classify.json --writers.las.filename=lasdump/tmp3.las \
    --readers.las.filename=lasdump/tmp3.las \
    --filters.assign.assignment=Classification[0:0]=2

pdal pipeline classify.json --writers.las.filename=lasdump/tmp4.las \
    --readers.las.filename=lasdump/tmp4.las \
    --filters.assign.assignment=Classification[0:0]=3

pdal pipeline classify.json --writers.las.filename=lasdump/tmp5.las \
    --readers.las.filename=lasdump/tmp5.las \
    --filters.assign.assignment=Classification[0:0]=4

pdal pipeline classify.json --writers.las.filename=lasdump/tmp6.las \
    --readers.las.filename=lasdump/tmp6.las \
    --filters.assign.assignment=Classification[0:0]=5

pdal pipeline classify.json --writers.las.filename=lasdump/tmp7.las \
    --readers.las.filename=lasdump/tmp7.las \
    --filters.assign.assignment=Classification[0:0]=6

pdal pipeline classify.json --writers.las.filename=lasdump/tmp8.las \
    --readers.las.filename=lasdump/tmp8.las \
    --filters.assign.assignment=Classification[0:0]=7

pdal pipeline classify.json --writers.las.filename=lasdump/tmp9.las \
    --readers.las.filename=lasdump/tmp9.las \
    --filters.assign.assignment=Classification[0:0]=8

pdal pipeline classify.json --writers.las.filename=lasdump/tmp10.las \
    --readers.las.filename=lasdump/tmp10.las \
    --filters.assign.assignment=Classification[0:0]=9

pdal pipeline merge.json --writers.las.filename=v1d0.las

####################
# data format id 1 #
####################

# generate 10 files of random points
pdal pipeline generator.json --writers.las.minor_version=1 \
    --writers.las.dataformat_id=1

# using placeholder classify script and repeat
pdal pipeline classify.json --writers.las.filename=lasdump/tmp1.las \
    --readers.las.filename=lasdump/tmp1.las \
    --filters.assign.assignment=Classification[0:0]=0

pdal pipeline classify.json --writers.las.filename=lasdump/tmp2.las \
    --readers.las.filename=lasdump/tmp2.las \
    --filters.assign.assignment=Classification[0:0]=1

pdal pipeline classify.json --writers.las.filename=lasdump/tmp3.las \
    --readers.las.filename=lasdump/tmp3.las \
    --filters.assign.assignment=Classification[0:0]=2

pdal pipeline classify.json --writers.las.filename=lasdump/tmp4.las \
    --readers.las.filename=lasdump/tmp4.las \
    --filters.assign.assignment=Classification[0:0]=3

pdal pipeline classify.json --writers.las.filename=lasdump/tmp5.las \
    --readers.las.filename=lasdump/tmp5.las \
    --filters.assign.assignment=Classification[0:0]=4

pdal pipeline classify.json --writers.las.filename=lasdump/tmp6.las \
    --readers.las.filename=lasdump/tmp6.las \
    --filters.assign.assignment=Classification[0:0]=5

pdal pipeline classify.json --writers.las.filename=lasdump/tmp7.las \
    --readers.las.filename=lasdump/tmp7.las \
    --filters.assign.assignment=Classification[0:0]=6

pdal pipeline classify.json --writers.las.filename=lasdump/tmp8.las \
    --readers.las.filename=lasdump/tmp8.las \
    --filters.assign.assignment=Classification[0:0]=7

pdal pipeline classify.json --writers.las.filename=lasdump/tmp9.las \
    --readers.las.filename=lasdump/tmp9.las \
    --filters.assign.assignment=Classification[0:0]=8

pdal pipeline classify.json --writers.las.filename=lasdump/tmp10.las \
    --readers.las.filename=lasdump/tmp10.las \
    --filters.assign.assignment=Classification[0:0]=9

# merge all class groups together
pdal pipeline merge.json --writers.las.filename=v1d1.las

####################
# data format id 2 #
####################

pdal pipeline generator.json --writers.las.minor_version=1 \
    --writers.las.dataformat_id=2

pdal pipeline classify.json --writers.las.filename=lasdump/tmp1.las \
    --readers.las.filename=lasdump/tmp1.las \
    --filters.assign.assignment=Classification[0:0]=0

pdal pipeline classify.json --writers.las.filename=lasdump/tmp2.las \
    --readers.las.filename=lasdump/tmp2.las \
    --filters.assign.assignment=Classification[0:0]=1

pdal pipeline classify.json --writers.las.filename=lasdump/tmp3.las \
    --readers.las.filename=lasdump/tmp3.las \
    --filters.assign.assignment=Classification[0:0]=2

pdal pipeline classify.json --writers.las.filename=lasdump/tmp4.las \
    --readers.las.filename=lasdump/tmp4.las \
    --filters.assign.assignment=Classification[0:0]=3

pdal pipeline classify.json --writers.las.filename=lasdump/tmp5.las \
    --readers.las.filename=lasdump/tmp5.las \
    --filters.assign.assignment=Classification[0:0]=4

pdal pipeline classify.json --writers.las.filename=lasdump/tmp6.las \
    --readers.las.filename=lasdump/tmp6.las \
    --filters.assign.assignment=Classification[0:0]=5

pdal pipeline classify.json --writers.las.filename=lasdump/tmp7.las \
    --readers.las.filename=lasdump/tmp7.las \
    --filters.assign.assignment=Classification[0:0]=6

pdal pipeline classify.json --writers.las.filename=lasdump/tmp8.las \
    --readers.las.filename=lasdump/tmp8.las \
    --filters.assign.assignment=Classification[0:0]=7

pdal pipeline classify.json --writers.las.filename=lasdump/tmp9.las \
    --readers.las.filename=lasdump/tmp9.las \
    --filters.assign.assignment=Classification[0:0]=8

pdal pipeline classify.json --writers.las.filename=lasdump/tmp10.las \
    --readers.las.filename=lasdump/tmp10.las \
    --filters.assign.assignment=Classification[0:0]=9

pdal pipeline merge.json --writers.las.filename=v1d2.las

####################
# data format id 3 #
####################

pdal pipeline generator.json --writers.las.minor_version=1 \
    --writers.las.dataformat_id=3

pdal pipeline classify.json --writers.las.filename=lasdump/tmp1.las \
    --readers.las.filename=lasdump/tmp1.las \
    --filters.assign.assignment=Classification[0:0]=0

pdal pipeline classify.json --writers.las.filename=lasdump/tmp2.las \
    --readers.las.filename=lasdump/tmp2.las \
    --filters.assign.assignment=Classification[0:0]=1

pdal pipeline classify.json --writers.las.filename=lasdump/tmp3.las \
    --readers.las.filename=lasdump/tmp3.las \
    --filters.assign.assignment=Classification[0:0]=2

pdal pipeline classify.json --writers.las.filename=lasdump/tmp4.las \
    --readers.las.filename=lasdump/tmp4.las \
    --filters.assign.assignment=Classification[0:0]=3

pdal pipeline classify.json --writers.las.filename=lasdump/tmp5.las \
    --readers.las.filename=lasdump/tmp5.las \
    --filters.assign.assignment=Classification[0:0]=4

pdal pipeline classify.json --writers.las.filename=lasdump/tmp6.las \
    --readers.las.filename=lasdump/tmp6.las \
    --filters.assign.assignment=Classification[0:0]=5

pdal pipeline classify.json --writers.las.filename=lasdump/tmp7.las \
    --readers.las.filename=lasdump/tmp7.las \
    --filters.assign.assignment=Classification[0:0]=6

pdal pipeline classify.json --writers.las.filename=lasdump/tmp8.las \
    --readers.las.filename=lasdump/tmp8.las \
    --filters.assign.assignment=Classification[0:0]=7

pdal pipeline classify.json --writers.las.filename=lasdump/tmp9.las \
    --readers.las.filename=lasdump/tmp9.las \
    --filters.assign.assignment=Classification[0:0]=8

pdal pipeline classify.json --writers.las.filename=lasdump/tmp10.las \
    --readers.las.filename=lasdump/tmp10.las \
    --filters.assign.assignment=Classification[0:0]=9

pdal pipeline merge.json --writers.las.filename=v1d3.las


#########################################
#########################################
############ Minor Version 4 ############
#########################################
#########################################

####################
# data format id 0 #
####################

pdal pipeline generator.json --writers.las.minor_version=1 \
    --writers.las.dataformat_id=0

pdal pipeline classify.json --writers.las.filename=lasdump/tmp1.las \
    --readers.las.filename=lasdump/tmp1.las \
    --filters.assign.assignment=Classification[0:0]=0

pdal pipeline classify.json --writers.las.filename=lasdump/tmp2.las \
    --readers.las.filename=lasdump/tmp2.las \
    --filters.assign.assignment=Classification[0:0]=1

pdal pipeline classify.json --writers.las.filename=lasdump/tmp3.las \
    --readers.las.filename=lasdump/tmp3.las \
    --filters.assign.assignment=Classification[0:0]=2

pdal pipeline classify.json --writers.las.filename=lasdump/tmp4.las \
    --readers.las.filename=lasdump/tmp4.las \
    --filters.assign.assignment=Classification[0:0]=3

pdal pipeline classify.json --writers.las.filename=lasdump/tmp5.las \
    --readers.las.filename=lasdump/tmp5.las \
    --filters.assign.assignment=Classification[0:0]=4

pdal pipeline classify.json --writers.las.filename=lasdump/tmp6.las \
    --readers.las.filename=lasdump/tmp6.las \
    --filters.assign.assignment=Classification[0:0]=5

pdal pipeline classify.json --writers.las.filename=lasdump/tmp7.las \
    --readers.las.filename=lasdump/tmp7.las \
    --filters.assign.assignment=Classification[0:0]=6

pdal pipeline classify.json --writers.las.filename=lasdump/tmp8.las \
    --readers.las.filename=lasdump/tmp8.las \
    --filters.assign.assignment=Classification[0:0]=7

pdal pipeline classify.json --writers.las.filename=lasdump/tmp9.las \
    --readers.las.filename=lasdump/tmp9.las \
    --filters.assign.assignment=Classification[0:0]=8

pdal pipeline classify.json --writers.las.filename=lasdump/tmp10.las \
    --readers.las.filename=lasdump/tmp10.las \
    --filters.assign.assignment=Classification[0:0]=9

pdal pipeline merge.json --writers.las.filename=v1d0.las

####################
# data format id 1 #
####################

# generate 10 files of random points
pdal pipeline generator.json --writers.las.minor_version=1 \
    --writers.las.dataformat_id=1

# using placeholder classify script and repeat
pdal pipeline classify.json --writers.las.filename=lasdump/tmp1.las \
    --readers.las.filename=lasdump/tmp1.las \
    --filters.assign.assignment=Classification[0:0]=0

pdal pipeline classify.json --writers.las.filename=lasdump/tmp2.las \
    --readers.las.filename=lasdump/tmp2.las \
    --filters.assign.assignment=Classification[0:0]=1

pdal pipeline classify.json --writers.las.filename=lasdump/tmp3.las \
    --readers.las.filename=lasdump/tmp3.las \
    --filters.assign.assignment=Classification[0:0]=2

pdal pipeline classify.json --writers.las.filename=lasdump/tmp4.las \
    --readers.las.filename=lasdump/tmp4.las \
    --filters.assign.assignment=Classification[0:0]=3

pdal pipeline classify.json --writers.las.filename=lasdump/tmp5.las \
    --readers.las.filename=lasdump/tmp5.las \
    --filters.assign.assignment=Classification[0:0]=4

pdal pipeline classify.json --writers.las.filename=lasdump/tmp6.las \
    --readers.las.filename=lasdump/tmp6.las \
    --filters.assign.assignment=Classification[0:0]=5

pdal pipeline classify.json --writers.las.filename=lasdump/tmp7.las \
    --readers.las.filename=lasdump/tmp7.las \
    --filters.assign.assignment=Classification[0:0]=6

pdal pipeline classify.json --writers.las.filename=lasdump/tmp8.las \
    --readers.las.filename=lasdump/tmp8.las \
    --filters.assign.assignment=Classification[0:0]=7

pdal pipeline classify.json --writers.las.filename=lasdump/tmp9.las \
    --readers.las.filename=lasdump/tmp9.las \
    --filters.assign.assignment=Classification[0:0]=8

pdal pipeline classify.json --writers.las.filename=lasdump/tmp10.las \
    --readers.las.filename=lasdump/tmp10.las \
    --filters.assign.assignment=Classification[0:0]=9

# merge all class groups together
pdal pipeline merge.json --writers.las.filename=v1d1.las

####################
# data format id 2 #
####################

pdal pipeline generator.json --writers.las.minor_version=1 \
    --writers.las.dataformat_id=2

pdal pipeline classify.json --writers.las.filename=lasdump/tmp1.las \
    --readers.las.filename=lasdump/tmp1.las \
    --filters.assign.assignment=Classification[0:0]=0

pdal pipeline classify.json --writers.las.filename=lasdump/tmp2.las \
    --readers.las.filename=lasdump/tmp2.las \
    --filters.assign.assignment=Classification[0:0]=1

pdal pipeline classify.json --writers.las.filename=lasdump/tmp3.las \
    --readers.las.filename=lasdump/tmp3.las \
    --filters.assign.assignment=Classification[0:0]=2

pdal pipeline classify.json --writers.las.filename=lasdump/tmp4.las \
    --readers.las.filename=lasdump/tmp4.las \
    --filters.assign.assignment=Classification[0:0]=3

pdal pipeline classify.json --writers.las.filename=lasdump/tmp5.las \
    --readers.las.filename=lasdump/tmp5.las \
    --filters.assign.assignment=Classification[0:0]=4

pdal pipeline classify.json --writers.las.filename=lasdump/tmp6.las \
    --readers.las.filename=lasdump/tmp6.las \
    --filters.assign.assignment=Classification[0:0]=5

pdal pipeline classify.json --writers.las.filename=lasdump/tmp7.las \
    --readers.las.filename=lasdump/tmp7.las \
    --filters.assign.assignment=Classification[0:0]=6

pdal pipeline classify.json --writers.las.filename=lasdump/tmp8.las \
    --readers.las.filename=lasdump/tmp8.las \
    --filters.assign.assignment=Classification[0:0]=7

pdal pipeline classify.json --writers.las.filename=lasdump/tmp9.las \
    --readers.las.filename=lasdump/tmp9.las \
    --filters.assign.assignment=Classification[0:0]=8

pdal pipeline classify.json --writers.las.filename=lasdump/tmp10.las \
    --readers.las.filename=lasdump/tmp10.las \
    --filters.assign.assignment=Classification[0:0]=9

pdal pipeline merge.json --writers.las.filename=v1d2.las

####################
# data format id 3 #
####################

pdal pipeline generator.json --writers.las.minor_version=1 \
    --writers.las.dataformat_id=3

pdal pipeline classify.json --writers.las.filename=lasdump/tmp1.las \
    --readers.las.filename=lasdump/tmp1.las \
    --filters.assign.assignment=Classification[0:0]=0

pdal pipeline classify.json --writers.las.filename=lasdump/tmp2.las \
    --readers.las.filename=lasdump/tmp2.las \
    --filters.assign.assignment=Classification[0:0]=1

pdal pipeline classify.json --writers.las.filename=lasdump/tmp3.las \
    --readers.las.filename=lasdump/tmp3.las \
    --filters.assign.assignment=Classification[0:0]=2

pdal pipeline classify.json --writers.las.filename=lasdump/tmp4.las \
    --readers.las.filename=lasdump/tmp4.las \
    --filters.assign.assignment=Classification[0:0]=3

pdal pipeline classify.json --writers.las.filename=lasdump/tmp5.las \
    --readers.las.filename=lasdump/tmp5.las \
    --filters.assign.assignment=Classification[0:0]=4

pdal pipeline classify.json --writers.las.filename=lasdump/tmp6.las \
    --readers.las.filename=lasdump/tmp6.las \
    --filters.assign.assignment=Classification[0:0]=5

pdal pipeline classify.json --writers.las.filename=lasdump/tmp7.las \
    --readers.las.filename=lasdump/tmp7.las \
    --filters.assign.assignment=Classification[0:0]=6

pdal pipeline classify.json --writers.las.filename=lasdump/tmp8.las \
    --readers.las.filename=lasdump/tmp8.las \
    --filters.assign.assignment=Classification[0:0]=7

pdal pipeline classify.json --writers.las.filename=lasdump/tmp9.las \
    --readers.las.filename=lasdump/tmp9.las \
    --filters.assign.assignment=Classification[0:0]=8

pdal pipeline classify.json --writers.las.filename=lasdump/tmp10.las \
    --readers.las.filename=lasdump/tmp10.las \
    --filters.assign.assignment=Classification[0:0]=9

pdal pipeline merge.json --writers.las.filename=v1d3.las

####################
# data format id 4 #
####################

# not currently supported

####################
# data format id 5 #
####################

# not currently supported

###################
data format id 6 #
###################

pdal pipeline generator.json --writers.las.minor_version=1 \
    --writers.las.dataformat_id=6

pdal pipeline classify.json --writers.las.filename=lasdump/tmp1.las \
    --readers.las.filename=lasdump/tmp1.las \
    --filters.assign.assignment=Classification[0:0]=0

pdal pipeline classify.json --writers.las.filename=lasdump/tmp2.las \
    --readers.las.filename=lasdump/tmp2.las \
    --filters.assign.assignment=Classification[0:0]=1

pdal pipeline classify.json --writers.las.filename=lasdump/tmp3.las \
    --readers.las.filename=lasdump/tmp3.las \
    --filters.assign.assignment=Classification[0:0]=2

pdal pipeline classify.json --writers.las.filename=lasdump/tmp4.las \
    --readers.las.filename=lasdump/tmp4.las \
    --filters.assign.assignment=Classification[0:0]=3

pdal pipeline classify.json --writers.las.filename=lasdump/tmp5.las \
    --readers.las.filename=lasdump/tmp5.las \
    --filters.assign.assignment=Classification[0:0]=4

pdal pipeline classify.json --writers.las.filename=lasdump/tmp6.las \
    --readers.las.filename=lasdump/tmp6.las \
    --filters.assign.assignment=Classification[0:0]=5

pdal pipeline classify.json --writers.las.filename=lasdump/tmp7.las \
    --readers.las.filename=lasdump/tmp7.las \
    --filters.assign.assignment=Classification[0:0]=6

pdal pipeline classify.json --writers.las.filename=lasdump/tmp8.las \
    --readers.las.filename=lasdump/tmp8.las \
    --filters.assign.assignment=Classification[0:0]=7

pdal pipeline classify.json --writers.las.filename=lasdump/tmp9.las \
    --readers.las.filename=lasdump/tmp9.las \
    --filters.assign.assignment=Classification[0:0]=8

pdal pipeline classify.json --writers.las.filename=lasdump/tmp10.las \
    --readers.las.filename=lasdump/tmp10.las \
    --filters.assign.assignment=Classification[0:0]=9

pdal pipeline merge.json --writers.las.filename=v1d6.las

####################
# data format id 7 #
####################

pdal pipeline generator.json --writers.las.minor_version=1 \
    --writers.las.dataformat_id=7

pdal pipeline classify.json --writers.las.filename=lasdump/tmp1.las \
    --readers.las.filename=lasdump/tmp1.las \
    --filters.assign.assignment=Classification[0:0]=0

pdal pipeline classify.json --writers.las.filename=lasdump/tmp2.las \
    --readers.las.filename=lasdump/tmp2.las \
    --filters.assign.assignment=Classification[0:0]=1

pdal pipeline classify.json --writers.las.filename=lasdump/tmp3.las \
    --readers.las.filename=lasdump/tmp3.las \
    --filters.assign.assignment=Classification[0:0]=2

pdal pipeline classify.json --writers.las.filename=lasdump/tmp4.las \
    --readers.las.filename=lasdump/tmp4.las \
    --filters.assign.assignment=Classification[0:0]=3

pdal pipeline classify.json --writers.las.filename=lasdump/tmp5.las \
    --readers.las.filename=lasdump/tmp5.las \
    --filters.assign.assignment=Classification[0:0]=4

pdal pipeline classify.json --writers.las.filename=lasdump/tmp6.las \
    --readers.las.filename=lasdump/tmp6.las \
    --filters.assign.assignment=Classification[0:0]=5

pdal pipeline classify.json --writers.las.filename=lasdump/tmp7.las \
    --readers.las.filename=lasdump/tmp7.las \
    --filters.assign.assignment=Classification[0:0]=6

pdal pipeline classify.json --writers.las.filename=lasdump/tmp8.las \
    --readers.las.filename=lasdump/tmp8.las \
    --filters.assign.assignment=Classification[0:0]=7

pdal pipeline classify.json --writers.las.filename=lasdump/tmp9.las \
    --readers.las.filename=lasdump/tmp9.las \
    --filters.assign.assignment=Classification[0:0]=8

pdal pipeline classify.json --writers.las.filename=lasdump/tmp10.las \
    --readers.las.filename=lasdump/tmp10.las \
    --filters.assign.assignment=Classification[0:0]=9

pdal pipeline merge.json --writers.las.filename=v1d7.las

####################
# data format id 8 #
####################

pdal pipeline generator.json --writers.las.minor_version=1 \
    --writers.las.dataformat_id=8

pdal pipeline classify.json --writers.las.filename=lasdump/tmp1.las \
    --readers.las.filename=lasdump/tmp1.las \
    --filters.assign.assignment=Classification[0:0]=0

pdal pipeline classify.json --writers.las.filename=lasdump/tmp2.las \
    --readers.las.filename=lasdump/tmp2.las \
    --filters.assign.assignment=Classification[0:0]=1

pdal pipeline classify.json --writers.las.filename=lasdump/tmp3.las \
    --readers.las.filename=lasdump/tmp3.las \
    --filters.assign.assignment=Classification[0:0]=2

pdal pipeline classify.json --writers.las.filename=lasdump/tmp4.las \
    --readers.las.filename=lasdump/tmp4.las \
    --filters.assign.assignment=Classification[0:0]=3

pdal pipeline classify.json --writers.las.filename=lasdump/tmp5.las \
    --readers.las.filename=lasdump/tmp5.las \
    --filters.assign.assignment=Classification[0:0]=4

pdal pipeline classify.json --writers.las.filename=lasdump/tmp6.las \
    --readers.las.filename=lasdump/tmp6.las \
    --filters.assign.assignment=Classification[0:0]=5

pdal pipeline classify.json --writers.las.filename=lasdump/tmp7.las \
    --readers.las.filename=lasdump/tmp7.las \
    --filters.assign.assignment=Classification[0:0]=6

pdal pipeline classify.json --writers.las.filename=lasdump/tmp8.las \
    --readers.las.filename=lasdump/tmp8.las \
    --filters.assign.assignment=Classification[0:0]=7

pdal pipeline classify.json --writers.las.filename=lasdump/tmp9.las \
    --readers.las.filename=lasdump/tmp9.las \
    --filters.assign.assignment=Classification[0:0]=8

pdal pipeline classify.json --writers.las.filename=lasdump/tmp10.las \
    --readers.las.filename=lasdump/tmp10.las \
    --filters.assign.assignment=Classification[0:0]=9

pdal pipeline merge.json --writers.las.filename=v1d8.las

####################
# data format id 9 #
####################

# not currently supported

####################
# data format id 10 #
####################

# not currently supported

########################################
########################################
########################################

rm -rf lasdump
