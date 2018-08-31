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

pdal pipeline generator.json --writers.las.minor_version=2 \
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

pdal pipeline merge.json --writers.las.filename=v2d0.las

####################
# data format id 1 #
####################

# generate 10 files of random points
pdal pipeline generator.json --writers.las.minor_version=2 \
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
pdal pipeline merge.json --writers.las.filename=v2d1.las

####################
# data format id 2 #
####################

pdal pipeline generator.json --writers.las.minor_version=2 \
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

pdal pipeline merge.json --writers.las.filename=v2d2.las

####################
# data format id 3 #
####################

pdal pipeline generator.json --writers.las.minor_version=2 \
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

pdal pipeline merge.json --writers.las.filename=v2d3.las


#########################################
#########################################
############ Minor Version 3 ############
#########################################
#########################################

####################
# data format id 0 #
####################

pdal pipeline generator.json --writers.las.minor_version=3 \
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

pdal pipeline merge.json --writers.las.filename=v3d0.las

####################
# data format id 1 #
####################

# generate 10 files of random points
pdal pipeline generator.json --writers.las.minor_version=3 \
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
pdal pipeline merge.json --writers.las.filename=v3d1.las

####################
# data format id 2 #
####################

pdal pipeline generator.json --writers.las.minor_version=3 \
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

pdal pipeline merge.json --writers.las.filename=v3d2.las

####################
# data format id 3 #
####################

pdal pipeline generator.json --writers.las.minor_version=3 \
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

pdal pipeline merge.json --writers.las.filename=v3d3.las


#########################################
#########################################
############ Minor Version 4 ############
#########################################
#########################################

####################
# data format id 0 #
####################

pdal pipeline generator.json --writers.las.minor_version=4 \
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

pdal pipeline merge.json --writers.las.filename=v4d0.las

####################
# data format id 1 #
####################

# generate 10 files of random points
pdal pipeline generator.json --writers.las.minor_version=4 \
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
pdal pipeline merge.json --writers.las.filename=v4d1.las

####################
# data format id 2 #
####################

pdal pipeline generator.json --writers.las.minor_version=4 \
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

pdal pipeline merge.json --writers.las.filename=v4d2.las

####################
# data format id 3 #
####################

pdal pipeline generator.json --writers.las.minor_version=4 \
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

pdal pipeline merge.json --writers.las.filename=v4d3.las

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

# classification adheres to slightly different standard in v1.4
pdal pipeline generator.json --readers.faux.count=190 \
    --writers.las.minor_version=4 \
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

pdal pipeline classify.json --writers.las.filename=lasdump/tmp11.las \
    --readers.las.filename=lasdump/tmp11.las \
    --filters.assign.assignment=Classification[0:0]=10

pdal pipeline classify.json --writers.las.filename=lasdump/tmp12.las \
    --readers.las.filename=lasdump/tmp12.las \
    --filters.assign.assignment=Classification[0:0]=11

pdal pipeline classify.json --writers.las.filename=lasdump/tmp13.las \
    --readers.las.filename=lasdump/tmp13.las \
    --filters.assign.assignment=Classification[0:0]=12

pdal pipeline classify.json --writers.las.filename=lasdump/tmp14.las \
    --readers.las.filename=lasdump/tmp14.las \
    --filters.assign.assignment=Classification[0:0]=13

pdal pipeline classify.json --writers.las.filename=lasdump/tmp15.las \
    --readers.las.filename=lasdump/tmp15.las \
    --filters.assign.assignment=Classification[0:0]=14

pdal pipeline classify.json --writers.las.filename=lasdump/tmp16.las \
    --readers.las.filename=lasdump/tmp16.las \
    --filters.assign.assignment=Classification[0:0]=15

pdal pipeline classify.json --writers.las.filename=lasdump/tmp17.las \
    --readers.las.filename=lasdump/tmp17.las \
    --filters.assign.assignment=Classification[0:0]=16

pdal pipeline classify.json --writers.las.filename=lasdump/tmp18.las \
    --readers.las.filename=lasdump/tmp18.las \
    --filters.assign.assignment=Classification[0:0]=17

pdal pipeline classify.json --writers.las.filename=lasdump/tmp18.las \
    --readers.las.filename=lasdump/tmp18.las \
    --filters.assign.assignment=Classification[0:0]=17

pdal pipeline classify.json --writers.las.filename=lasdump/tmp19.las \
    --readers.las.filename=lasdump/tmp19.las \
    --filters.assign.assignment=Classification[0:0]=18

pdal pipeline merge.json --writers.las.filename=v4d6.las

####################
# data format id 7 #
####################

pdal pipeline generator.json --readers.faux.count=190 \
    --writers.las.minor_version=4 \
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

pdal pipeline classify.json --writers.las.filename=lasdump/tmp11.las \
    --readers.las.filename=lasdump/tmp11.las \
    --filters.assign.assignment=Classification[0:0]=10

pdal pipeline classify.json --writers.las.filename=lasdump/tmp12.las \
    --readers.las.filename=lasdump/tmp12.las \
    --filters.assign.assignment=Classification[0:0]=11

pdal pipeline classify.json --writers.las.filename=lasdump/tmp13.las \
    --readers.las.filename=lasdump/tmp13.las \
    --filters.assign.assignment=Classification[0:0]=12

pdal pipeline classify.json --writers.las.filename=lasdump/tmp14.las \
    --readers.las.filename=lasdump/tmp14.las \
    --filters.assign.assignment=Classification[0:0]=13

pdal pipeline classify.json --writers.las.filename=lasdump/tmp15.las \
    --readers.las.filename=lasdump/tmp15.las \
    --filters.assign.assignment=Classification[0:0]=14

pdal pipeline classify.json --writers.las.filename=lasdump/tmp16.las \
    --readers.las.filename=lasdump/tmp16.las \
    --filters.assign.assignment=Classification[0:0]=15

pdal pipeline classify.json --writers.las.filename=lasdump/tmp17.las \
    --readers.las.filename=lasdump/tmp17.las \
    --filters.assign.assignment=Classification[0:0]=16

pdal pipeline classify.json --writers.las.filename=lasdump/tmp18.las \
    --readers.las.filename=lasdump/tmp18.las \
    --filters.assign.assignment=Classification[0:0]=17

pdal pipeline classify.json --writers.las.filename=lasdump/tmp18.las \
    --readers.las.filename=lasdump/tmp18.las \
    --filters.assign.assignment=Classification[0:0]=17

pdal pipeline classify.json --writers.las.filename=lasdump/tmp19.las \
    --readers.las.filename=lasdump/tmp19.las \
    --filters.assign.assignment=Classification[0:0]=18

pdal pipeline merge.json --writers.las.filename=v4d7.las

####################
# data format id 8 #
####################

pdal pipeline generator.json --readers.faux.count=190 \
    --writers.las.minor_version=4 \
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

pdal pipeline classify.json --writers.las.filename=lasdump/tmp11.las \
    --readers.las.filename=lasdump/tmp11.las \
    --filters.assign.assignment=Classification[0:0]=10

pdal pipeline classify.json --writers.las.filename=lasdump/tmp12.las \
    --readers.las.filename=lasdump/tmp12.las \
    --filters.assign.assignment=Classification[0:0]=11

pdal pipeline classify.json --writers.las.filename=lasdump/tmp13.las \
    --readers.las.filename=lasdump/tmp13.las \
    --filters.assign.assignment=Classification[0:0]=12

pdal pipeline classify.json --writers.las.filename=lasdump/tmp14.las \
    --readers.las.filename=lasdump/tmp14.las \
    --filters.assign.assignment=Classification[0:0]=13

pdal pipeline classify.json --writers.las.filename=lasdump/tmp15.las \
    --readers.las.filename=lasdump/tmp15.las \
    --filters.assign.assignment=Classification[0:0]=14

pdal pipeline classify.json --writers.las.filename=lasdump/tmp16.las \
    --readers.las.filename=lasdump/tmp16.las \
    --filters.assign.assignment=Classification[0:0]=15

pdal pipeline classify.json --writers.las.filename=lasdump/tmp17.las \
    --readers.las.filename=lasdump/tmp17.las \
    --filters.assign.assignment=Classification[0:0]=16

pdal pipeline classify.json --writers.las.filename=lasdump/tmp18.las \
    --readers.las.filename=lasdump/tmp18.las \
    --filters.assign.assignment=Classification[0:0]=17

pdal pipeline classify.json --writers.las.filename=lasdump/tmp18.las \
    --readers.las.filename=lasdump/tmp18.las \
    --filters.assign.assignment=Classification[0:0]=17

pdal pipeline classify.json --writers.las.filename=lasdump/tmp19.las \
    --readers.las.filename=lasdump/tmp19.las \
    --filters.assign.assignment=Classification[0:0]=18

pdal pipeline merge.json --writers.las.filename=v4d8.las

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
